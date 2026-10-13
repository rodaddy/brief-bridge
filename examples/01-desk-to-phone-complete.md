# Worked example 1 — desk to phone, the whole trip

The everyday run. Work is half done at the desk, the owner has to leave, and the
work continues on a phone that has never heard of this kit.

**Business:** Harbour Lane Bookkeeping (invented). Branding step recorded the
name `Harbour Lane Bookkeeping` and the voice `friendly`.

---

## What went in

Forty minutes of back-and-forth in Claude on a laptop, working on a new
onboarding checklist for bookkeeping clients. The relevant state at the moment
the owner stood up:

- They had settled that the checklist is one page, sent as a PDF, and that it
  covers everything they need from a client in the first week.
- They had written the first four items and argued out the wording of item 3.
- They had NOT decided whether bank read-only access is asked for on this
  checklist or in a separate follow-up email.
- The next thing to do was write items 5 through 7, which cover payroll.

Then the owner typed:

> give me the brief, I'm getting in the car

---

## What came out

The whole message, exactly as emitted — nothing before it, nothing after it:

```
You are receiving a work-session brief. Read it and continue the work from Next Step. You do not need any special software or setup — everything you need is written below.

--- WORK SESSION BRIEF ---
Business: Harbour Lane Bookkeeping

What We Are Working On:
We're writing a one-page new-client onboarding checklist that goes out as a PDF. It lists everything we need from a client in their first week.

Decisions Already Made:
- One page, no more. It gets sent as a PDF, not a form.
- It covers the first week only — anything later belongs somewhere else.
- Item 3 is worded "A recent statement from every business account, including any account you only use occasionally" — the "only use occasionally" part is deliberate and stays.

Current State:
Items 1 through 4 are written and we're happy with them. Items 5 through 7 are not started. Nothing has been laid out or turned into a PDF yet — this is still just the list.

Open Questions:
- Do we ask for bank read-only access on this checklist, or leave it out and ask in a separate email once they've signed? Not decided.

Next Step:
Draft items 5, 6, and 7, covering what we need for payroll.

Key Content To Carry:
Items 1-4 as written:
1. Your business's legal name and EIN, exactly as they appear on your filings.
2. Last year's filed return, or a note telling us who has it.
3. A recent statement from every business account, including any account you only use occasionally.
4. A list of anyone who can spend money on the business's behalf, and what they're allowed to spend it on.
--- END BRIEF ---
```

Note what the voice did: `friendly` shows up in the sentences ("We're writing…",
"we're happy with them"), and nowhere else. The headings and the format block are
fixed and never change with voice.

Note what the safety copy did: this was a file-capable install, so the same text
was also written to `~/Documents/briefs/onboarding-checklist-2026-08-13.md`,
silently, without being mentioned in the chat.

---

## The other side: a phone with nothing installed

The owner pasted that message into ChatGPT on their phone at a red light and
said "keep going." ChatGPT has never seen this skill, has no Brief Bridge
installed, and has no memory of the desk session.

What it said back — one line, then the work:

> Picked up where you left off — next step is drafting items 5, 6, and 7 for
> payroll.
>
> 5. A current payroll register, or the name of the payroll service and who at
>    your office can grant us access.
> 6. A list of everyone on payroll, whether each one is an employee or a
>    contractor, and the date each one started.
> 7. Copies of any state withholding or unemployment registrations you've
>    received — if you're not sure you have them, say so and we'll look them up.

**Why that worked with nothing installed:** the first line of the brief told the
receiving AI what the message was and what to do with it. That line is the whole
product. It is also why the open question about bank access came across intact —
ChatGPT flagged it back at the end ("You still haven't decided whether bank
read-only access goes on this sheet — want to settle that now?") rather than
quietly picking one.

---

## What did NOT happen

- **Nothing was invented.** The bank-access question stayed an open question on
  both sides; neither AI resolved it to make the brief look complete.
- **Nothing was appended to the brief message.** The "copy everything from the
  first line through END BRIEF" instruction came as a separate follow-up message
  so that the copied block stayed clean.
- **The phone did not need the kit.** No install, no skill, no account link.
