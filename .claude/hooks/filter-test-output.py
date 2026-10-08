#!/usr/bin/env python3
"""PostToolUse hook for Bash (token economy R6): when a test command succeeds or fails, keep only the failing lines
and the summary in the model's context; the full output goes to .claude/test-output/last.log (grep it on demand).
Fail-open: any unexpected payload shape leaves the tool output untouched."""
import json
import os
import re
import sys

TEST_CMD = re.compile(r"\b(playwright\s+test|yarn\s+(run\s+)?test(:ui)?\b|npm\s+(run\s+)?test\b|npx\s+playwright\s+test)")
FAIL = re.compile(r"(✘|\bFAILED\b|\bfailed\b|Error:|error TS\d+|^\s*\d+\)\s|Expected|Received|expect\(|at .*\.spec\.ts|\.spec\.ts:\d+|\d+ (failed|flaky|did not run))")
SUMMARY = re.compile(r"^\s*\d+ (passed|skipped|failed|flaky|did not run)\b")
MAX_KEEP = 80


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0
    if payload.get("tool_name") != "Bash":
        return 0
    cmd = (payload.get("tool_input") or {}).get("command", "")
    if not TEST_CMD.search(cmd):
        return 0
    resp = payload.get("tool_response")
    if isinstance(resp, str):
        text, shape = resp, "str"
    elif isinstance(resp, dict) and isinstance(resp.get("stdout"), str):
        text, shape = resp["stdout"], "dict"
    else:
        return 0
    lines = text.splitlines()
    if len(lines) <= MAX_KEEP:
        return 0
    root = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()
    log_dir = os.path.join(root, ".claude", "test-output")
    try:
        os.makedirs(log_dir, exist_ok=True)
        log = os.path.join(log_dir, "last.log")
        with open(log, "w", encoding="utf-8") as fh:
            fh.write(text)
    except OSError:
        return 0
    keep = [ln for ln in lines if FAIL.search(ln) or SUMMARY.search(ln)][:MAX_KEEP]
    note = f"[test output filtered: {len(lines)} lines -> {len(keep)} failing/summary lines; full output in {log}; use grep on it]"
    filtered = "\n".join(keep + [note]) if keep else note
    new = filtered if shape == "str" else {**resp, "stdout": filtered}
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PostToolUse", "updatedToolOutput": new}}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
