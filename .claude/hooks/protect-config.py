#!/usr/bin/env python3
"""PreToolUse hook for Write|Edit|MultiEdit|NotebookEdit: executors may not rewrite existing linter/formatter/test/CI
configs (ECC config-protection idea). Creating a new config file is allowed; changing an existing one needs the tech
lead to do it on purpose with CLAUDE_ALLOW_CONFIG_EDIT=1 in the environment. Owner-only files are always denied."""
import json
import os
import re
import sys

OWNER_ONLY = [r"/\.claude/settings(\.local)?\.json$", r"/\.ssh/", r"/\.aws/", r"/\.config/gh/", r"\.env(\.|$)", r"\.pem$", r"id_rsa", r"id_ed25519",
              r"/Library/LaunchAgents/.*\.plist$", r"/AgentControl/com\.local\..*\.plist$"]
PROTECTED = [r"(^|/)(\.eslintrc(\..*)?|eslint\.config\..*|\.prettierrc(\..*)?|prettier\.config\..*|biome\.json|\.stylelintrc.*)$",
             r"(^|/)(tsconfig(\..*)?\.json|jest\.config\..*|vitest\.config\..*|playwright\.config\..*|pytest\.ini|pyproject\.toml|setup\.cfg|tox\.ini|\.flake8|ruff\.toml|mypy\.ini)$",
             r"(^|/)(\.github/workflows/.*\.ya?ml|\.gitlab-ci\.yml|\.pre-commit-config\.yaml|\.husky/.*|lint-staged\.config\..*)$",
             r"(^|/)(package\.json)$"]


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0
    ti = payload.get("tool_input") or {}
    path = ti.get("file_path") or ti.get("notebook_path") or ""
    if not path:
        return 0
    for pat in OWNER_ONLY:
        if re.search(pat, path):
            return deny(f"{os.path.basename(path)} is owner-only")
    if os.environ.get("CLAUDE_ALLOW_CONFIG_EDIT") == "1":
        return 0
    for pat in PROTECTED:
        if re.search(pat, path) and os.path.exists(path):
            return deny(f"{os.path.basename(path)} is a protected config; fix the code, not the config. "
                        "If the config change is the task, the tech lead sets CLAUDE_ALLOW_CONFIG_EDIT=1 for that step.")
    return 0


def deny(reason: str) -> int:
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny",
                      "permissionDecisionReason": "protect-config: " + reason}}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
