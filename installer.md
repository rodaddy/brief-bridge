# Brief Bridge — Installer

> You are reading the Brief Bridge installer.

**Version:** 1.0.2
**Created by:** Rico Rojas / rTech Digital Consulting
**Package contents:** `START-HERE.md`, this file, `skills/brief/SKILL.md`, `OPERATIONS-MANUAL.md`, `README.md`, `CHANGELOG.md`, `VERSION`, `examples/`

**Never installed, never zipped:** `tests/` holds maintainer-only checks. It is
**not copied** into any install and is **not part of** the buyer path. If a
`tests/` folder is present in the folder you were handed, skip it everywhere
below — it is not one of the files you copy, stage, or zip. `examples/` is
reading material that ships in the download; it is not copied into the installed
skill folder either, and it is NEVER the data you verify against (Section 4).

---

## What This File Does

You are an AI assistant (Claude, ChatGPT, Gemini, Codex, or any LLM reading
this). This file tells you how to:

1. Detect what runtime you are and what your host platform requires
2. **Transform this package into whatever your host needs** — never declare it
   incompatible
3. Install the one Brief skill so the user can say "give me the brief" anywhere
4. Verify the install with the buyer's own real work and a confirmed hand-off
   into a second chat

**Do not summarize this file. Do not explain what you are about to do. Begin
with Section 1 now.**

---

## Section 1: Installation Trigger

When the user shares this file or says "install brief bridge," begin
immediately. Greet them with one line: "Let's set up Brief Bridge — one skill,
about two minutes, maybe one question." Then proceed to Section 2.

---

## Section 2: Detect Your Runtime

Determine which of these you are. Do not ask the user technical questions you
can answer yourself by testing your own capabilities.

| You are… | Signs | Go to |
| --- | --- | --- |
| **A coding agent with filesystem access** (Claude Code, Codex CLI, or similar) | you can run shell commands and write files to the user's disk | 3A |
| **A chat app that supports uploaded skills** (Claude app: web, desktop, or mobile) | no filesystem, but your platform accepts **zip uploads** as skills | 3B |
| **A chat app with projects/custom instructions but no skills feature** (ChatGPT Projects, Gemini Gems, or similar) | no filesystem, no skill uploads, but persistent instructions exist | 3C |
| **A plain chat session** — none of the above | no filesystem, no skills, no persistent instructions | 3D |

If you are genuinely unsure between two rows, ask ONE question: "Are we talking
in the Claude app, ChatGPT, or a terminal?" and map the answer to the closest
row.

**The rule that governs everything below: this package is ONE canonical folder
of markdown. If your host needs a different shape — a zip, pasted instructions,
anything — YOU produce that shape from the canonical files, right now,
yourself. "This package doesn't work here" is never the answer.**

---

## Section 2.5: Already installed? (chat-app upgrades — 3B, 3C, 3D)

Section 3A does its collision check with files. **3B, 3C, and 3D have no folder
to copy, so the same guarantee has to be made in the shape those hosts have.**
Do this BEFORE you build a zip, write condensed instructions, or load anything
into the conversation.

1. **Ask whether Brief Bridge is already there.** One question: *"Do you already
   have Brief Bridge set up here — a Brief skill, or a Project/Gem with its
   instructions in it?"* If they say no, go straight to your 3B/3C/3D section.
2. **If it is already there, find its version.** Ask them to paste the first few
   lines of the existing skill or Project/Gem instructions, or to read you the
   version if one is stated. If you cannot determine it, treat the installed
   copy as older. Then ask the ONE upgrade question, using the version on the
   `**Version:**` line at the top of THIS file as `<new>`: *"You have v<old>;
   this is v<new> — upgrade keeping all your settings, or skip?"* On skip, leave
   everything as-is and stop.
3. **Back it up before you replace it — the chat-app form of a backup is a copy
   the user holds.** Paste the FULL current text of the existing skill /
   Project instructions back into the chat under a clear line: *"Here is your
   current Brief Bridge, saved. Copy this somewhere before we continue — it is
   your rollback."* Then **PAUSE** and wait for them to confirm they saved it.
   If you cannot read the existing text at all, say so plainly and ask only:
   *"I can't read your current setup to save a copy — do you want to continue
   without a rollback, or skip the upgrade?"* Never claim a backup you did not
   produce.
4. **Preserve their data by construction.** Whatever the old setup recorded as
   THEIRS — the business name and the formal/friendly voice from the branding
   step, plus anything else they filled in — is carried forward into the new
   instructions **verbatim**. Read those values out of the text they pasted in
   step 3 and write them into the new version yourself.
   - **Do NOT re-run the branding interview on an upgrade.** No customer
     re-answers a question they already answered. If the old text has a business
     name and a voice, use them and say which ones you carried: *"Kept your
     name (<name>) and your <formal/friendly> tone."*
   - If the old text genuinely records no name or voice, THEN run the branding
     step (Section 3.5) as a first-time install would.
   - Only the shipped instruction text is replaced. Their saved briefs are plain
     text they keep elsewhere and are untouched.
5. **If any step of this fails partway** — you replaced part of the instructions
   and the rest did not land — **STOP.** State which part is new and which is
   still old, tell them the rollback copy from step 3 is the way back, and ask
   only: *"Retry the upgrade, or restore your saved copy?"* Never call an
   upgrade complete after a partial replacement.

Then continue into 3B / 3C / 3D as normal.

---

## Section 3A: Coding agent with filesystem access

1. Locate your skills directory: `~/.claude/skills/` (Claude Code),
   `~/.codex/skills/` (Codex CLI), or your platform's equivalent. Create it if
   missing.
2. **Collision check first — and if it's THIS kit, offer an upgrade.** Before
   copying anything, check whether `brief` already exists in the skills
   directory.
   - **Same kit already installed (an upgrade).** If the existing `brief/` is a
     previous Brief Bridge, read the installed copy's version — from the
     `**Version:**` line of any `installer.md`/manual copied in beside it, or
     the README changelog if present; **if you can't determine it, treat the
     installed copy as older.** Then ask ONE question: *"You have v<old>; this
     is v<new> — upgrade keeping all your data, or skip?"* — where `<new>` is
     the version on the `**Version:**` line at the top of THIS file, read from
     the file, never typed from memory. (If you couldn't read the installed
     copy's version, say *"You have an earlier Brief Bridge; this is v<new> —
     upgrade keeping all your data, or skip?"*, using that same read value.
     Never name a specific version number that you did not read off this
     file's `**Version:**` line.)
     - **On upgrade:** first back up the old skill folder by **copying it
       recursively** to `brief.backup-<old-version>` (e.g.
       `brief.backup-1.0`; if the version is unknown, use
       `brief.backup-<YYYYMMDD>`). If that backup name already exists, append
       `-2`, `-3`, and so on; never overwrite a backup. Then replace ONLY the
       shipped instruction files in the live `brief/` folder: copy the new
       `SKILL.md` and `OPERATIONS-MANUAL.md` over their old copies. **NEVER
       overwrite the user's own data.** Leave the entire live
       `brief/branding/` folder untouched (their business name and voice in
       `brand.md`, and `image-setup.md`). Saved briefs are text the user keeps
       elsewhere — nothing of theirs lives in the skill folder besides
       `branding/`. Do NOT re-run the branding step: an upgrade keeps the name
       and voice the user already gave.
     - **On skip:** leave the installed kit exactly as-is and stop.
     - **If any backup or copy step fails:** STOP. State which path worked and
       which path did not, leave the live skill and `branding/` unchanged, and
       ask only: "Should I retry the backup, or skip this upgrade?" Never claim
       the upgrade succeeded after a partial copy.
   - **A different, unrelated skill happens to be named `brief`.** Do NOT
     silently overwrite: tell the user and ask "replace, keep yours, or back
     yours up first?" For "back up," rename the existing folder to
     `brief.backup-<YYYYMMDD>` before copying.
3. Copy the `skills/brief/` folder into it **recursively — the entire folder,
   every file**, not just `SKILL.md`.
4. Copy `OPERATIONS-MANUAL.md` into the installed `brief/` skill folder so the
   manual survives after the user deletes the unzipped package.
5. Run the branding step (Section 3.5), then assert the install: confirm
   `brief/SKILL.md` exists and its frontmatter `name:` is `brief`. Then go to
   Section 4 (Verify).

## Section 3B: Chat app with skill uploads (zip required)

**Run Section 2.5 first** (already-installed check, rollback copy, carry their
name and voice forward). Do not build a zip over an existing install without it.

Your platform accepts skills only as zip archives. The zip is not in this
package — **you create it**:

1. Build the zip contents in a staging folder first, then zip it. Exact layout:
   - Stage a folder named `brief/`. Into it, copy **`skills/brief/SKILL.md`**
     and **`OPERATIONS-MANUAL.md`** (mirroring the 3A step-4 copy, so the
     driving manual survives inside the installed skill). The staged `brief/`
     folder therefore contains exactly: `SKILL.md` and `OPERATIONS-MANUAL.md`.
   - Zip that `brief/` folder so the FIRST path entry in the archive is
     `brief/` — nothing above it. NOT `skills/brief/`, NOT a wrapping folder,
     and NOT a bare `SKILL.md` at the archive root.
   - exclude OS junk: no `__MACOSX/`, no `.DS_Store`.
   - **exclude `tests/` and `examples/`.** `tests/` is maintainer-only and is
     not part of the buyer path; `examples/` is reading material that stays in
     the download folder. Neither goes in the zip. Zipping `tests/` would put
     script files inside a skill whose stated dependency floor is empty — do
     not do it.
   - sanity-check the listing against these rules before handing it over: it
     must list exactly `brief/`, `brief/SKILL.md`, `brief/OPERATIONS-MANUAL.md`
     — nothing else, and in particular no file whose name ends in `.mjs`,
     `.js`, `.ts`, `.py`, or `.sh`.
2. Give the user the zip as a downloadable file. If you built it but cannot
   deliver files on this platform, fall through to Section 3C — do not stop.
3. Tell the user the upload steps. Current Claude app labels: "Settings →
   Capabilities → turn ON Code execution and file creation (one-time), then
   Settings → Customize → Skills → upload this zip → toggle it on." Add: menu
   labels change between app versions — if these don't match, look for the
   Skills and Capabilities sections in Settings.
4. If you cannot create zip files on this platform at all, fall through to
   Section 3C — do not stop.
5. Run the branding step (Section 3.5).
6. **Deliver the driving instructions inline now.** The zip carries
   `OPERATIONS-MANUAL.md`, but the app may never show the user its text — so
   before the pause, paste the essential manual lines directly into the chat so
   they are not a dead-end reference. Give them these, in plain words:
   - **The one move:** say "give me the brief" in any AI chat; copy the whole
     message it returns; paste it into any other AI (another app, phone, or
     vendor) and say "keep going" — it continues where you left off, nothing
     installed on the other side.
   - **Car mode:** talk your work out with your phone's AI, say "give me the
     brief" before you get out, paste it at your desk.
   - **Reinstall / move platforms:** hand `installer.md` to the AI on the new
     platform and say "install brief bridge."
   - **Uninstall:** remove the Brief skill in Settings → Skills (or delete the
     Project/Gem). Saved briefs are just text and keep working.
7. Then **PAUSE.** The upload happens outside this chat. Say: "Tell me when it's
   uploaded and toggled on, and we'll test it." Only when the user confirms, go
   to Section 4 (Verify).

## Section 3C: Projects / custom instructions, no skills feature

**Run Section 2.5 first** (already-installed check, rollback copy, carry their
name and voice forward). Overwriting a Project's instructions is the one move
here that can destroy what they already set up, so the rollback copy is not
optional.

Your platform holds persistent instructions but not skill files. Condense it
yourself:

1. **Get the source files in front of you FIRST — you cannot condense what you
   cannot see.** The user handed you only `installer.md`, so the rest of the kit
   is not yet visible to you. Before reading or condensing anything, tell the
   user in plain language exactly which files from the unzipped kit folder to add
   to the Project/Gem as sources, then STOP and wait for them to confirm the
   files are added. Name them fully, spelled out from the kit root:
   - `skills/brief/SKILL.md`
   - `OPERATIONS-MANUAL.md`
   Say: "Add those two files to this Project/Gem as sources, then tell me when
   they're in and I'll read them and build your condensed instructions."
   **Fallback if the platform caps Project files** (free plans often cap around
   five): instead of adding files, ask the user to paste the contents of the two
   listed files into the chat one at a time — same read-set, different transport.
   "I can't see those files" is never a dead end.
2. Only once the sources are in front of you (added or pasted), read the whole
   `skills/brief/SKILL.md` and `OPERATIONS-MANUAL.md`.
3. Write a short instruction document (about a page — this skill is tiny)
   that preserves, in order:
   1. the EMIT behavior — the trigger phrases and the **exact brief format**,
      including the self-instructing first line and all six section headings
      ("What We Are Working On", "Decisions Already Made", "Current State",
      "Open Questions", "Next Step", "Key Content To Carry"); copy the format
      block verbatim, it is the whole product. Include the multi-hop re-emit
      rule: if this conversation was itself started from a pasted brief, emit
      ONE fresh brief for the current state — never embed or quote the earlier
      brief;
   2. the RESUME behavior — when a pasted message starts with "You are
      receiving a work-session brief," adopt it and confirm in one line;
   3. the essential driving lines from `OPERATIONS-MANUAL.md`, folded in so the
      user isn't pointed at a manual they don't have: the one move (say "give me
      the brief," copy the whole message, paste into any other AI, say "keep
      going"); car mode (talk it out on the phone, "give me the brief" before
      you get out, paste at the desk); how to reinstall/move platforms (hand
      `installer.md` to the new AI, say "install brief bridge").
4. Deliver it the way your platform allows: paste the FULL text inline for the
   user to copy if you cannot attach files.
5. Tell the user where it goes: ChatGPT → new Project → Instructions, name it
   "Brief Bridge." Gemini → new Gem → Instructions. Similar platforms → the
   closest persistent-instructions slot.
6. Run the branding step (Section 3.5). Then **PAUSE.** The paste-and-save
   happens outside this chat. Say: "Once it's saved, start a NEW chat in the
   Project/Gem and say 'give me the brief' — Section 4 runs there, not here."

## Section 3D: Plain chat session

Nothing persists here, so there is nothing of theirs to overwrite — Section 2.5
does not apply, beyond carrying any name and voice they state in this
conversation. Install into the conversation:

1. Read `skills/brief/SKILL.md` (ask the user to paste it if you cannot see it).
2. Say: "I've loaded Brief Bridge for this conversation. For a permanent
   install, open this same file with the Claude app, a Claude Code or Codex
   terminal, or a ChatGPT Project and I'll install it there."
3. Go to Section 4 (Verify) — run it in-conversation.

---

## Section 3.5: Images & Branding (all paths, minimal here)

Brief Bridge makes no pictures — its only visible output is the text header of
each brief. So image detection is one line and branding is one short question.

**Image capability:** this kit produces no artwork; record that plainly. If you
are creating `branding/`, write `branding/image-setup.md` with a single line:
"Brief Bridge produces text only — no image generation needed." (If the user
later wants a logo on printed briefs and you record a native raster lane, do not
trust the brand name — even on ChatGPT or Gemini a Business/Enterprise/Edu
workspace can disable image generation, so verify the tool actually responds
before recording native generation and fall back to SVG/CSS on Claude if it
doesn't — but do not push it.)

**Branding interview** — ask, in plain language:

> "Briefs can carry your business name in the header so they always look like
> yours. What's the name — and should the tone be formal or friendly? (Skip
> this and I'll leave the name off.)"

Then create `branding/brand.md` **inside the installed skill folder** (next to
`SKILL.md`, so the skill reads it skill-relative per §4.5 of the kit standard;
skip the folder entirely on 3D plain chat and just keep the name/voice in the
conversation). It holds:

- business name (or "none — leave header name off")
- voice: formal or friendly
- the image line above

The `brief` skill reads `branding/brand.md` before emitting: the business name
goes in the header, and the voice sets the tone of the sentences it writes. If
the user gives nothing, the skill omits the name line and defaults to a plain,
neutral tone — never invents a name.

---

## Section 4: Verify (all paths)

Never end by listing what you did. Prove it works with the buyer's own current
work — not the install session and not shipped demo text.

1. Ask one question: "What real piece of work do you want to move to another
   chat right now? Tell me the goal, where it stands, and the next action — or
   paste the work here."
2. **Named refusal — no real work in hand:** if the user gives no goal, current
   state, or next action, **STOP. ASK.** Say exactly: "I can see that Brief Bridge
   is installed, but I do not yet have your real work goal, current state, and
   next action, so I cannot verify the hand-off without inventing them. What
   real work should this first brief carry?" Leave the install **unverified**
   until they answer. Do not substitute an install-session example.
3. Once the real input is present, run EMIT on it and show the full brief. Confirm
   that all six headings are present, `Next Step` contains one specific action,
   and no missing fact was guessed.
4. Ask the user to copy everything from the first line through END BRIEF into a
   new chat on any AI and say "keep going." **PAUSE** while they do that. The
   receiving side needs nothing installed.
5. When the user reports what the new chat did, verify that it named the same
   next step. If it did not, state the mismatch and correct the brief; do not
   declare verification complete. If the user cannot open another chat now,
   leave the install unverified and give that one test as the next step.
6. For the full flow and car mode: on a **coding-agent install (3A)** point them
   to `OPERATIONS-MANUAL.md` in the installed `brief/` folder. On a **chat-app
   install (3B/3C)** do NOT point at a file they can't open — you already gave
   them the essential lines (3B step 6 / the folded-in section of the 3C
   instruction doc); offer to walk any of it again right here.

## Section 5: If Anything Fails

Diagnose and adapt — do not bounce the problem to the user or the vendor. State
what the host rejected, produce the alternative shape from the canonical file,
and continue. Only after exhausting Section 3 may you name the one concrete step
you need (e.g., "enable code execution in Settings → Capabilities, then say
'continue install'").
