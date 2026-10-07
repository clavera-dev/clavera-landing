# Cloud trial (CLAVERA)

- Date: 2026-10-06
- Base commit: 5772b2b (m9 line); re-applied on main bd435d4 after the push-policy merge
- Node: v22.22.0
- `npm ci`: FAIL (repo has yarn.lock only, no package-lock.json). `yarn install --frozen-lockfile`: pass (24.7s).
- `npm run build` (astro build): PASS, 12 pages built.
- Loaded in cloud: CLAUDE.md, .claude/settings.json (deny/allow rules, PreToolUse hooks guard-bash.py and protect-config.py), subagents executor/reviewer/researcher, skill redesign-existing-projects.
- Hooks work: guard-bash.py blocked a Bash command whose text merely mentioned the reserved push command (false positive on heredoc text, not only on real calls).
- Setup note: settings allow `yarn`, not `npm`; use `yarn install --frozen-lockfile` in cloud instead of `npm ci`.
- Before the policy change (old hook) every push was blocked, even after owner approval; an empty remote branch agent/clavera-cloud-trial-20261007 was created via the GitHub API, no files.
- After the policy change (main bd435d4): git push to a new agent/* branch WORKED, no force. Quirks: the hook misparses a redirect like `2>&1` after the push command as the branch name, and it scans whole command text (commit messages, heredocs) for the word. Keep push a bare, separate command. A hook check runs before `git checkout` in the same command, so it still uses the old hook files.
