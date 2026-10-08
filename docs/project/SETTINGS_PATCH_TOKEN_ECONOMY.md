# `.claude/settings.json` patch — token economy (owner-only file)

`.claude/settings.json` is owner-only (`protect-config.py` denies agent edits), so the change is delivered as this patch. The hook script it registers, `.claude/hooks/filter-test-output.py`, is already in the repository.

Add these top-level keys and one PostToolUse entry (keys checked against the Claude Code settings reference on 2026-10-08; `autoCompactWindow`/`modelSettings` need Claude Code >= 2.1.288, `bashOutputMaxChars` >= 2.1.261):

```json
"autoCompactWindow": 150000,
"bashOutputMaxChars": 10000,
"modelSettings": { "claude-haiku-5-5": { "autoCompactWindow": 100000 } },
```

and inside `"hooks"`, next to `"PreToolUse"`:

```json
"PostToolUse": [
  {
    "matcher": "Bash",
    "hooks": [
      { "type": "command", "command": "python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/filter-test-output.py", "timeout": 10 }
    ]
  }
]
```

Notes: `bashOutputMaxChars` affects successful commands only (failures keep the ~10,000-character inline limit). The hook is fail-open: it only touches output of test commands longer than 80 lines, keeps failing and summary lines, and writes the full output to `.claude/test-output/last.log` (git-ignored). The `tool_response` shape for Bash was not confirmed in the docs; the hook handles both a plain string and `{stdout, stderr}`. First real run: check that a long `yarn test` output arrives shortened with the "[test output filtered …]" note; if it arrives unchanged, the hook did nothing and nothing is lost.
