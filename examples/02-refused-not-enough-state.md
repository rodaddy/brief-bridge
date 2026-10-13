# Worked example 2 — the kit says no

**This is the most important example in the folder.** It is the run where no
brief gets produced.

A hand-off tool that always hands you something is a formatter. The expensive
failure here is not an ugly brief — it is a brief that *looks* complete, gets
pasted into a session on a phone, and sends the work off in a direction nobody
chose, because the AI filled a blank rather than admit it was blank. So the
skill has a stated condition under which it stops flat:

> **Named refusal — insufficient real state:** if you cannot identify the user's
> real goal, current state, or one specific next action from the conversation,
> **STOP. ASK.**
> — `skills/brief/SKILL.md`, Behavior 1 (EMIT)

**Business:** Harbour Lane Bookkeeping (same invented business as example 1).

---

## What went in

A short conversation. The owner had been thinking out loud for about ten minutes
about whether to raise prices for existing clients — comparing what two
competitors charge, worrying about losing two specific long-time clients, and
never landing anywhere. Then:

> give me the brief, I want to think about this on the train

That looks briefable. There is a real topic, real detail, and a real reason to
carry it. It is not briefable, because there is no next action in it — nothing
has been decided and nothing is half-built.

---

## What came out: no brief

> I can carry the goal — you're deciding whether to raise prices for existing
> clients — and the thinking so far: two competitors are at $450 and $525 a
> month for roughly what you do at $380, and you don't want to lose the Delgado
> and Whitfield accounts over it.
>
> But I can't identify one specific next action without guessing. Nothing's been
> decided yet, so there's nothing for the other session to *start*. If I make
> one up — "draft the price increase letter", say — I'd be handing your phone a
> decision you haven't made.
>
> What should the next step be? Two that would work: "figure out what the
> increase actually is for the ten smallest accounts", or "write down what would
> have to be true for Delgado to stay at a higher price."

**Nothing else happened.** Specifically:

- **No brief was emitted.** Not a partial one, not a draft one with a blank line
  where `Next Step:` goes.
- **No next step was invented.** The two options offered are labelled as
  suggestions, in a question, and neither was written into anything.
- **The `--- WORK SESSION BRIEF ---` block never appeared**, so there was
  nothing sitting in the chat that could get copied by accident.
- **No safety copy was written.** There is no half-brief in
  `~/Documents/briefs/`.

The thinking so far was not thrown away — it is quoted back in the first
paragraph, so nothing is lost by refusing.

---

## The same refusal on the receiving side

RESUME has its own version of this, and it fires on structure rather than on
content:

> **Validate the mechanical contract before continuing.** Require exactly one
> work-session brief block, all six headings, and a non-empty `Next Step` with
> one specific action. If any are missing, duplicated, or unreadable,
> **STOP. ASK.**
> — `skills/brief/SKILL.md`, Behavior 2 (RESUME)

That one is deterministic on purpose: count the blocks, check the six headings,
check `Next Step:` is not empty. A mechanical rule decides, the AI just runs it.
Example 3 shows it firing.

---

## Why this is the file to read first

Every other example shows the kit working. This one shows it holding the line,
and the line is what makes the rest trustworthy. A brief you receive is a brief
that had enough real state behind it to be worth sending.
