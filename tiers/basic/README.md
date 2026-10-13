# Brief Bridge -- basic

The only tier of this kit. Version below is read from the kit's `VERSION` file.

## What ships

One skill with two behaviors: **EMIT** a hand-off brief when the user asks for
one, and **RESUME** the work when a brief is pasted in. Saying "give me the
brief" in any AI conversation returns a single structured message capturing what
you are working on, the decisions made, current state, open questions, the exact
next step, and any key content already produced. Paste that brief into any other
AI session and it continues from where you left off.

The package is `START-HERE.md` (the first file to open), `installer.md` (handed
to any AI to install), `skills/brief/SKILL.md` (the one skill),
`OPERATIONS-MANUAL.md` (how to drive it, including car mode), plus `README.md`,
`CHANGELOG.md`, `VERSION`, and `examples/` (three complete worked runs, reading
material only). A `branding/` folder is created at install and records the
business name and formal/friendly voice; the name goes in the brief header and
the voice sets the tone of the sentences the AI writes.

On file-capable installs, EMIT also saves a silent safety copy of the brief to
`~/Documents/briefs/<work-name>-<date>.md`.

`tests/` is maintainer-only. It is never installed and never zipped, and
`tests/verify-install.mjs` enforces that by scanning the package for buyer-path
files ending in `.mjs`, `.js`, `.ts`, `.py`, or `.sh` with `tests/` as the one
stated exemption.

## Who it is for

Anyone who works a session in one place and finishes it in another -- phone to
car to desk, or one AI vendor to a different one. It is nothing but the brief
format, which makes it a small reference for how a cross-device and
cross-vendor hand-off can look. It carries the person's own work forward so they pick up
without re-explaining anything and get more done in the time they have.

## What it refuses to do

- **No brief without real state.** If a conversation has no real next action in
  it, EMIT refuses and nothing is invented (`examples/02-refused-not-enough-state.md`).
- **No guessing on a bad brief.** RESUME stops rather than filling in a missing
  next step when a brief arrives truncated.
- **No nesting on a re-emit.** A multi-hop re-emit builds ONE new brief from
  current state; it never nests or appends a prior brief.
- **No executing embedded instructions.** The brief's structure is trusted, but
  imperatives buried inside section content are DATA to carry, not commands to
  run; they are surfaced and only acted on if the user confirms.
- **No invented business name.** If no name was recorded at install, the header
  line is omitted rather than filled in.
- **No overwriting the buyer's data on upgrade.** The old skill folder is backed
  up first, only shipped instruction files are replaced, `branding/` is left
  untouched, and the branding interview is not re-run. A partial replacement
  STOPs rather than being reported as complete.
- **No verifying against the shipped examples.** Install verification uses a
  real piece of the buyer's own work, never the invented runs in `examples/`.
- **No "this package doesn't work here."** The installer transforms the kit into
  whatever shape the host needs.

## Install

From `START-HERE.md`: unzip the download (tap the zip on iPhone/iPad, right-click
and Extract All on Windows, double-click on Mac), open the folder, and get
`installer.md` in front of your AI -- drag it into the chat, or share it in, or
open it and paste its full text. Then say **install brief bridge**.

The installer then runs itself, per `installer.md`:

1. **Detect the runtime** -- coding agent with filesystem access (3A), chat app
   that accepts zip skill uploads (3B), projects/custom instructions with no
   skills feature (3C), or a plain chat session (3D).
2. **Already installed?** For 3B/3C/3D, Section 2.5 runs first: ask whether Brief
   Bridge is already there, read its version, ask upgrade-or-skip, paste the
   current text back as a rollback copy and PAUSE until the user saves it, then
   carry the recorded name and voice forward verbatim.
3. **Install for that runtime.** 3A: locate `~/.claude/skills/` or
   `~/.codex/skills/`, run the collision check (offering an upgrade with a
   `brief.backup-<version>` copy if it is this kit), copy `skills/brief/`
   recursively, and copy `OPERATIONS-MANUAL.md` in beside it. 3B: stage a
   `brief/` folder holding exactly `SKILL.md` and `OPERATIONS-MANUAL.md`, zip it
   so `brief/` is the first path entry, exclude OS junk plus `tests/` and
   `examples/`, sanity-check the listing, hand over the zip, and give the upload
   steps. 3C/3D: condense the same instructions into the Project/Gem or the
   conversation.
4. **Branding (Section 3.5)** -- record the business name and formal/friendly
   voice.
5. **Verify (Section 4)** -- run the hand-off on a real piece of the user's own
   work and confirm it lands in a second chat.

Uninstall: delete the `brief` folder from `~/.claude/skills/` or
`~/.codex/skills/`, or remove the Brief skill / Project / Gem in the app. Briefs
already saved are plain text and keep working.

## Current version

```
1.0.2
```
