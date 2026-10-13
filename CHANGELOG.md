# Changelog

All notable changes to the Brief Bridge kit are recorded here. This file follows
Keep a Changelog and Semantic Versioning. The kit's shipped version also appears
on the `**Version:**` line in `installer.md` and in `VERSION`.

## [Unreleased]

### Changed

- Public export: `README.md` rewritten for outside readers, internal paths and
  product-line references removed, MIT `LICENSE` added. No kit behaviour
  changed; `VERSION` stays 1.0.2.

## [1.0.2] - 2026-08-17

A two-model review (kit-hardening pass) found six confirmed
defects in the 1.0.1 hardening. All six are fixed here.

### Added

- **`examples/` — a worked-example layer** this kit never had. Three complete runs: `01-desk-to-phone-complete.md` (the
  everyday trip, input through emitted brief through what the receiving AI did
  with nothing installed), `02-refused-not-enough-state.md` (the EMIT refusal
  firing — no brief produced, nothing invented), and
  `03-multi-hop-and-malformed.md` (a re-emit that does not nest a prior brief,
  and RESUME stopping on a truncated one). The work in them is invented and
  labelled so. They explicitly do NOT satisfy the buyer's-own-data
  first-run box, and `examples/README.md` says that in those words.
- **Section 2.5 of `installer.md` — chat-app upgrades.** 1.0.1's hardened
  upgrade procedure lived entirely in the 3A filesystem branch, so a 3B/3C
  buyer reinstalling over an existing setup had no stated upgrade path, no
  backup, and nothing preventing the branding interview from being re-run over
  their recorded name and voice. 2.5 gives those hosts the same guarantee in
  the shape they have: already-installed check, version question read off this
  file's `**Version:**` line, a pasted rollback copy with a PAUSE until the user
  saves it, their recorded name and voice carried forward verbatim with no
  re-interview, and a STOP on partial replacement.
- **Acceptance-checklist boxes** for the worked-example layer, the
  `tests/`+`examples/` payload exclusion, and the chat-app upgrade path.

### Fixed

- **The `tests/` carve-out is now enforced, not just asserted.**
  `verify-install.mjs` scanned for `.ts`/`.py`/`.sh`/`.bash` and omitted
  `.mjs` — so the guard whose job is proving no buyer runtime script ships was
  blind to its own two files. The scan now covers
  `.ts`/`.mts`/`.cts`/`.js`/`.mjs`/`.cjs`/`.py`/`.sh`/`.bash`/`.rb`/`.pl` with
  `tests/` as the single named exemption, and the exclusion is now stated in
  `installer.md` Package contents and in the 3B zip layout (which previously
  described a zip that would have carried `tests/` along).
- **The unknown-version upgrade fallback no longer names a version the package
  is not.** `installer.md` said "this is v1.0" while the kit shipped 1.0.1. It
  now instructs the AI to read the version off this file's `**Version:**` line
  and forbids naming a literal it did not read. A new test fails on any version
  literal in the prose that is not the shipped version, so this cannot drift
  again silently.
- **`verify-install.mjs` no longer throws after detecting missing files.** It
  reported required-file failures and then unconditionally `readFile`d
  `skills/brief/SKILL.md` and `installer.md`, so a malformed kit died with an
  uncaught exception instead of a clean receipt. It now reports every
  required-file problem and exits 1 before the content checks.

### Changed

- **The behavioral tests assert structural invariants instead of exact prose.**
  The 1.0.1 tests matched literal sentences, which made them brittle against a
  line reflow or an em-dash normalization while still passing on a rewrite that
  kept a heading and removed the guarantee under it. Each refusal is now checked
  for the parts the rule is made of — the STOP token, the enumeration of what is
  missing, the no-invention clause, the three mechanical counts RESUME makes.
  Both directions are proven below.
- **These are documentation-contract tests and the file now says so** in a
  header comment. They check that the shipped instructions still state each
  guarantee; they cannot prove an AI obeys it at runtime. That claim is made
  only by the clean-room boxes in the README checklist, and the unchecked ones
  stay unchecked.

### Verified

Run 2026-08-17 on plain Node 24 (v24.19.0):

- `node --test tests/brief-bridge.test.mjs` — 10 tests, 10 pass, 0 fail.
- `node tests/verify-install.mjs` — PASS, exit 0.

Red-first proof, run against a scratch copy with each defect injected (every
one of these went red, then green when
the defect was removed):

- a `.mjs` planted under `skills/brief/` → `unexpected buyer runtime script`,
  exit 1. This is the exact hole the old scan could not see.
- `skills/brief/SKILL.md` removed → both failures reported, exit 1, no uncaught
  exception. This was one of the review findings.
- `examples/` removed → reported missing, exit 1.
- `this is v<new>` replaced with `this is v1.0` → the version-literal test fails
  and names the stale literal. Caught a real bug in the test's own first draft,
  which forgave `1.0` as a prefix of `1.0.1`.
- the EMIT refusal's no-invention clause replaced with "fill it in with your
  best reasonable assumption" while the `Named refusal` heading was left intact
  → fails. The 1.0.1 test suite passed on this exact mutation.
- 3C's Section 2.5 routing deleted → fails.
- **Brittleness control:** the em-dash in `Named refusal — insufficient real
  state` normalized to a hyphen AND the `copying it recursively` line reflowed
  → all 10 still pass, which the 1.0.1 suite would not have.

### Not done

- The 3B chat-app zip path, the buyer's-own-data first run, and the real-device
  spot check remain unchecked boxes in the README. Section 2.5 is WRITTEN, not
  clean-room tested; nothing here upgrades those claims.

## [1.0.1] - 2026-08-13

### Fixed

- Install verification now requires the buyer's own real work and a second-chat
  hand-off. If the buyer cannot supply a real goal, current state, and next
  action, the installer stops and leaves the install unverified instead of
  passing on an install-session fixture.
- EMIT and RESUME now carry named deterministic refusal conditions. Missing real
  state, malformed structure, duplicated brief blocks, or an empty next action
  stop the flow, show what was readable, and ask one question without guessing.
- Upgrades now copy the old skill to a collision-safe backup, update both shipped
  instruction files in the live folder, preserve `branding/` in place, and stop
  cleanly if any backup or copy step fails.
- The README acceptance checklist now records the refusal condition and no longer
  claims that structural trigger matching proved a buyer-data first run.

### Verified

- Plain Node was used for all deterministic maintainer checks; the buyer path
  runs no scripts and requires no Bun, Node, package manager, or install chain.
- `node --test tests/brief-bridge.test.mjs`: pass.
- `node tests/verify-install.mjs`: pass.

## [1.0.0] - 2026-08-13

First recorded version. The kit's content already existed and shipped; what it
lacked was a version record. Establishing the baseline is the change — no kit
content was rewritten to create it.

### Added

- **`VERSION` file** at `1.0.0`, so the kit has one place that states its
  version.
- **This changelog.**
- **Portability notes** in `README.md`: a "What changes by host" section
  (coding agent, shell without subagents, chat only, and what is lost in chat
  only) and a per-harness install table (Claude app, Codex, claude.ai web).
- **`claude.ai web` recorded as UNVERIFIED.** Nobody has run a zip upload
  through the web UI. The row stays unverified until a human does it; it is not
  upgraded by inference.

### Changed

- **`installer.md` version line** from `1.0` to `1.0.0`, matching three-part
  semver.
- **Concurrency language** now reads "subagents running workflows" rather than
  naming a vendor CLI. Brief Bridge is a kit whose
  entire premise is cross-vendor continuity, so a hard-coded vendor binary in
  its own copy was the sharpest version of that contradiction.

### Notes

- The buyer path has no scripts, so there is no Bun, jq, Python, or Node
  dependency for the buyer. The product is a skill and a format, which is why it
  still works in a chat-only host.
