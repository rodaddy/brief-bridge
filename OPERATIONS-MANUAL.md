# Brief Bridge — Operations Manual

Move a whole work session from one place to another — phone to car to desk, or
one AI to a completely different AI — by handing over a single message.

## The one move

Say **"give me the brief"** in any AI conversation. You get back one message:
the brief. It captures what you're working on, what you've already decided,
where things stand, what's still open, the exact next step, and any real work
already produced (a drafted email, a paragraph, a decision).

Copy that whole message. Paste it into any other AI conversation — a different
app, a different device, a different company's assistant. That session reads it
and picks up exactly where you left off, then tells you the next step in one
line.

## Why it works anywhere — nothing to install on the other side

The brief's very first line says, in plain English, "You are receiving a
work-session brief. Read it and continue the work from Next Step." That line is
the whole trick. The AI you paste into doesn't need Brief Bridge, doesn't need
any setup — it just reads that instruction and follows it. Brief Bridge only
needs to be installed on the side that *writes* the brief, and even that's
optional if you keep the format handy.

## Car mode

1. In the car, talk your work out with your phone's AI — hands-free is fine.
2. Before you get out, say **"give me the brief."**
3. At your desk, open your usual AI, paste the brief, say "keep going."

You never lost your place, and you never had to re-explain anything.

## Going the other direction (desk to phone)

Same move — it's symmetric. Working at the laptop, about to leave? "Give me the
brief," text it to yourself, paste it into your phone's AI on the way out.

## Your name and tone on it

If you set a business name during install, every brief carries it in the header,
so a brief you forward looks like yours. No name set means no name shown — never
a made-up one. If you picked a tone (formal or friendly), the AI writes each
brief's sentences in that tone. Change either any time by editing
`branding/brand.md`, or just tell the AI "put my business name on the briefs" or
"keep the briefs friendly."

## Reinstalling / moving platforms

Hand `installer.md` to the AI on the new platform and say "install brief
bridge." It adapts the one skill to whatever that platform needs — you never
repackage anything yourself.

## Uninstall

- Coding agents (Claude Code / Codex): delete the `brief` folder from
  `~/.claude/skills/` and/or `~/.codex/skills/`.
- Apps: remove the Brief skill in Settings → Skills, or delete the Project/Gem.

Any briefs you already saved are just text — they keep working forever.

## Credits

Extracted and generalized from the "give me the brief" hand-off in an earlier
idea-development kit. Built by Rico Rojas at rTech Digital Consulting.
