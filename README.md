# Brief Bridge

Say "give me the brief" in one AI conversation, paste the result into another,
and carry on where you left off. Across devices, and across AI vendors.

**State: written, partly checked.** Version 1.0.2. The install paths and the
brief format were walked through by AI agents in clean sandboxes, and the
documentation-contract tests pass. The 3B zip path, a first run on a real
person's own work, and a human device check have not been done (see the
acceptance checklist below).

## What it is

One skill, for any AI that can read instructions. When you say **"give me the
brief"**, it emits a single structured message capturing:

- what you are working on,
- the decisions made,
- the current state,
- open questions,
- the exact next step,
- any key content already produced.

Paste that message into any other AI session (phone, car, laptop; Claude,
ChatGPT, Gemini) and it continues from the next step. **The receiving side
needs nothing installed.** The brief's first line tells whatever AI reads it
what to do with the rest. That self-instructing header is the whole trick.

## Why it exists

Long AI sessions die in one place: you start on a laptop and want to keep going
on your phone, or you hit a limit in one vendor's app and want to switch to
another. Re-explaining the whole context costs more than the work itself. A
fixed, plain-English hand-off format solves that without any sync service,
account, or integration.

## It refuses rather than invents

- **No brief without real state.** If the conversation has no real next action
  in it, EMIT stops, says what is missing, and asks. It does not make one up.
- **No guessing on a broken brief.** If a pasted brief is truncated or
  malformed, RESUME says what it could read, names the missing part, and asks
  one question.
- **Embedded instructions are data.** Imperatives buried inside a brief's
  sections are carried and surfaced, never executed without the user
  confirming.
- **No nesting.** Re-emitting after a resume builds one fresh brief from
  current state; it never wraps the previous brief.

Worked runs, including the refusal, are in `examples/`. The work in them is
invented and labelled so.

## How to run it

1. Download or clone this repo.
2. Open `START-HERE.md` for device-by-device steps. Short version: give
   `installer.md` to your AI and say **install brief bridge**.
3. The installer detects what your AI can do: a coding agent with file access
   copies `skills/brief/` into its skills folder; a chat app that takes skill
   zips gets a zip; a Projects/Gems setup gets a condensed form; a plain chat
   loads it into the conversation.
4. It asks two branding questions (an optional business name for the brief
   header, and a formal or friendly voice), then verifies on a real piece of
   your own work.

`OPERATIONS-MANUAL.md` covers day-to-day use, including a hands-free car mode.

### Dependencies

**None for the user.** Installing and using the skill runs no scripts and needs
no Node, Python, Bun, jq, shell, or package manager.

Maintainers can run the checks under `tests/` with plain Node 22 or later,
no `npm install`:

```text
node --test tests/brief-bridge.test.mjs
node tests/verify-install.mjs
```

`brief-bridge.test.mjs` asserts the structural invariants of each rule (stop
token, named list of what is missing, no-invention clause, required headings)
rather than exact prose. It cannot prove an AI obeys the rule at runtime.
`verify-install.mjs` checks required files exist and that no script file sits
anywhere in the user-facing package outside `tests/`. `tests/` and `examples/`
are never installed and never zipped; `installer.md` says so in its package
contents and its zip layout.

### What changes by host

- **Coding agent** (Claude Code, Codex): everything works. On file-capable
  installs, EMIT also saves a silent copy to
  `~/Documents/briefs/<work-name>-<date>.md`.
- **Shell but no subagents**: identical. The kit has no parallel work.
- **Chat only**: EMIT and RESUME still work, since they are pure conversation.
  Lost: the saved copy (copy the brief out yourself), possibly the recorded
  business name and voice, and any scripted install check.

| Harness | Status |
| --- | --- |
| Claude app (zip upload) | not yet run for this kit (a 2026-08-12 check covered this install path on another kit, not this one) |
| Codex (folder) | not yet run for this kit (a 2026-08-12 check covered this install path on another kit, not this one) |
| claude.ai web | unverified, never tested |

## What it does not do

- It does not sync, store, or send anything anywhere. The brief is text you
  move yourself.
- It does not make an AI remember anything. The receiving session knows only
  what is in the brief.
- It does not judge whether your next step is a good one; it carries it.
- It is not a full transcript export. It is a deliberately short hand-off.

## Layout

```
START-HERE.md          how to get installer.md to your AI
installer.md           detects runtime, adapts, installs, verifies
OPERATIONS-MANUAL.md   how to drive it, including car mode
CHANGELOG.md
skills/brief/SKILL.md  the one skill: EMIT and RESUME
examples/              three worked runs, never installed
tests/                 maintainer checks, never installed or zipped
tiers/basic/           notes on the single shipped tier
```

`branding/` is created at install time and is not in this repo.

## Acceptance checklist

- [x] Coding-agent install: skill folder present, frontmatter `name: brief`,
      operations manual copied in (clean-room agent run, 2026-07-15).
- [ ] Chat-app path: the AI generates one correct zip (`brief/` at the root, no
      OS junk).
- [x] Condensed (Projects/Gems) path keeps all six headings and the
      self-instructing first line verbatim; the pause gate is present.
- [x] Branding produces a valid `branding/brand.md`, with a name and with none
      (no name means the header line is omitted, never invented).
- [x] Resume with nothing installed: an emitted brief pasted into a fresh AI
      continues from the next step off the first line alone (agent cold read).
- [ ] One live first run on a real person's own work: emit, paste into a second
      session, confirm it names the same next step. Shipped examples do not
      count.
- [x] Named refusal on insufficient state or a malformed brief:
      `skills/brief/SKILL.md` states it; the installer leaves install
      unverified when there is no real work in hand.
- [x] `tests/` and `examples/` stay out of the installed payload, enforced by
      `tests/verify-install.mjs`.
- [x] Chat-app reinstalls back up and preserve the recorded name and voice
      (`installer.md` section 2.5).
- [ ] Real-device spot check by a human on an actual phone.

## License

MIT. See `LICENSE`.

Built by Rico Rojas at rTech Digital Consulting (https://rtech-consulting.com).
