#!/usr/bin/env python3
"""PreToolUse hook for Bash: deny the owner's reserved categories even when hidden in compound commands.

Reserved (owner 06.10.2026): deletion, git push, deploy/publish, secrets, money, plus system-level service removal.
settings.json deny rules already cover the plain forms; this hook also looks inside `bash -c "..."`, `sh -c`, `eval`,
`$(...)`, backticks, heredocs, `xargs`, `find -delete/-exec rm`, `git push --force` (allowing --force-with-lease is
irrelevant here: every push is reserved). Exit 0 with JSON deny → Claude sees the reason and does not retry blindly.
Allowed by design: `git branch -D` on agent/* branches is still blocked (deletion); reading files is never touched.
"""
import json
import re
import sys

DENY = [
    (r"(^|[\s;&|(`])(rm|rmdir|shred|trash|unlink)\s", "deletion is reserved for the owner"),
    (r"\bfind\b.*\s(-delete|-exec\s+rm)\b", "find -delete / -exec rm is deletion"),
    (r"\bgit\s+(push|remote\s+(add|remove|rm|set-url)|branch\s+(-D|--delete|-d)\b|clean\s+-[a-zA-Z]*f|reset\s+--hard|checkout\s+--\s|restore\s+--source)",
     "git push/remote/branch deletion/clean/hard reset are reserved for the owner"),
    (r"\bgh\s+(pr\s+merge|release|repo\s+delete|secret|auth\s+(logout|refresh))\b", "gh merge/release/delete/secret is reserved"),
    (r"\b(npm|yarn|pnpm)\s+publish\b|\bvercel\b|\bnetlify\b|\bfly\s+deploy\b|\bwrangler\b|\bdocker\s+push\b", "publish/deploy is reserved for the owner"),
    (r"\b(aws|gcloud|az)\s", "cloud provider CLIs are reserved"),
    (r"\bsecurity\s+(find|add|delete)-(generic|internet)-password\b", "Keychain access is reserved; use the jev-route script"),
    (r"\bsudo\b", "sudo is reserved for the owner"),
    (r"\blaunchctl\s+(unload|remove|bootout|disable)\b", "stopping services is reserved for the owner"),
    (r"(^|[\s;&|(`])(cat|less|more|head|tail|bat|sed|awk|grep|rg|cp|mv|scp|base64|xxd|strings)\s[^|;&]*(\.env(\.|\b)|\.pem\b|id_rsa|id_ed25519|/\.ssh/|/\.aws/|/\.config/gh/)",
     "reading or copying secrets is reserved"),
    (r"\b(stripe|paypal|braintree)\b|\bcurl\b[^|;&]*(api\.stripe\.com|checkout|/payments?/|/charge)", "payments are reserved for the owner"),
    (r"(>|>>)\s*~?/?Users/k/\.claude/settings(\.local)?\.json", "settings.json is owner-only"),
]
UNWRAP = [
    r"(?:bash|sh|zsh)\s+-l?c\s+(['\"])(.*?)\1",
    r"\beval\s+(['\"])(.*?)\1",
    r"\$\(([^()]*)\)",
    r"`([^`]*)`",
    r"<<-?\s*['\"]?(\w+)['\"]?\n(.*?)\n\1",
    r"\bxargs\b[^|;&]*?\s(-I\s*\S+\s+)?([a-z][\w-]*\s.*)$",
]


def fragments(cmd: str):
    out = [cmd]
    seen = set()
    while out:
        c = out.pop()
        if c in seen:
            continue
        seen.add(c)
        yield c
        for pat in UNWRAP:
            for m in re.finditer(pat, c, flags=re.S | re.M):
                inner = m.group(m.lastindex)
                if inner and inner not in seen:
                    out.append(inner)


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0
    if payload.get("tool_name") != "Bash":
        return 0
    cmd = (payload.get("tool_input") or {}).get("command") or ""
    if not cmd.strip():
        return 0
    for frag in fragments(cmd):
        for pat, reason in DENY:
            if re.search(pat, frag, flags=re.I | re.M):
                print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny",
                                  "permissionDecisionReason": f"guard-bash: {reason}. Ask the owner in the thread; do not rephrase the command."}}))
                return 0
    return 0


if __name__ == "__main__":
    sys.exit(main())
