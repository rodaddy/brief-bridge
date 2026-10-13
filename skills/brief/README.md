# skills/brief

The one skill Brief Bridge installs. `SKILL.md` holds its frontmatter (`name:
brief` plus the trigger phrases) and both behaviors: **EMIT**, which builds the
hand-off brief when the user asks for one, and **RESUME**, which continues the
work when a brief is pasted in.

The installer copies this whole folder into the skills directory
(`~/.claude/skills/`, `~/.codex/skills/`, or the host equivalent) and drops
`OPERATIONS-MANUAL.md` in beside it. Before either behavior runs, the skill reads
`branding/brand.md` for the recorded business name and voice.
