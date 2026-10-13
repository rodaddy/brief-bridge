# Worked examples — see the hand-off work before you trust it with your own

Three complete runs. Each one shows the real-shaped conversation that went IN,
the exact brief that came OUT, and what the *receiving* AI did with it on the
other side. Nothing here is a screenshot or a summary — this is the shape the
kit actually produces.

Read one, then do the same thing with your own work.

| File | What it shows |
| --- | --- |
| `01-desk-to-phone-complete.md` | The everyday path, end to end: a half-finished piece of work at the desk, "give me the brief", the emitted brief, and the phone picking it up cold with nothing installed on that side. |
| `02-refused-not-enough-state.md` | **The kit saying no.** A request for a brief in a conversation that has no real next action in it. No brief was emitted and nothing was invented. This is the most important file in the folder. |
| `03-multi-hop-and-malformed.md` | Two things that go wrong on the second hop: the re-emit that must NOT nest the old brief, and a brief that arrived truncated — RESUME stops rather than guessing the missing next step. |

## What these are NOT

These examples exist so you can see the flow before you commit. **They are not
your install test.** When you install Brief Bridge, it puts a piece of work YOU
actually have in front of you through the hand-off, with your real goal and your
real next action in it — because a brief about a made-up project proves nothing
about whether it carries yours. If the installer ever offers to verify itself
against the runs in this folder, it is doing the wrong thing (`installer.md`
Section 4 says so in those words).

## The work in these examples is invented

The businesses, projects, and people here are made up for illustration. The
shape of the brief — the self-instructing first line, the six headings, the
single `Next Step:` — is exactly what the kit emits.

## Nothing in this folder gets installed

`examples/` is reading material that stays in the download folder. It is not
copied into the installed skill and is not zipped for a chat-app install.
