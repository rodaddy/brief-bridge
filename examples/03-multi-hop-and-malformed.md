# Worked example 3 — the second hop, and the brief that arrived broken

Two failures that only show up after the first hand-off has already worked.

**Business:** Delaney Site Services (invented). Voice recorded as `formal`.

---

## Part A — the re-emit that must not nest

The owner started a session on their phone from a pasted brief (hop 1: desk →
phone). Twenty minutes later, at the desk again, they wanted to hand it BACK
(hop 2: phone → desk).

### What went in

The phone conversation had itself begun with a `--- WORK SESSION BRIEF ---`
block pasted at the top. On top of that, real work had happened: two of the
three open questions got answered and the next step moved on. Then:

> give me the brief again

### The wrong output — what the kit must NOT produce

The obvious thing an AI does here is quote the brief it was given and add what
changed:

```
--- WORK SESSION BRIEF ---
...
Key Content To Carry:
Earlier brief received at 9:40am:
--- WORK SESSION BRIEF ---
What We Are Working On: ...
--- END BRIEF ---
--- END BRIEF ---
```

That has two brief blocks in one message and two self-instructing first lines by
the third hop. It grows every trip, and RESUME on the far side now cannot tell
which `Next Step:` is the live one. The skill forbids it in those terms:

> The output must contain exactly ONE self-instructing first line and ONE
> `--- WORK SESSION BRIEF ---` block, no matter how many hops came before, so
> length and trigger lines never accumulate.
> — `skills/brief/SKILL.md`, Behavior 1 (EMIT), multi-hop re-emit

### What came out — one fresh brief, built from current state

```
You are receiving a work-session brief. Read it and continue the work from Next Step. You do not need any special software or setup — everything you need is written below.

--- WORK SESSION BRIEF ---
Business: Delaney Site Services

What We Are Working On:
A one-page subcontractor packet that goes to every new sub before their first day on a site.

Decisions Already Made:
- The packet is a PDF, sent by email, and is not a signable form.
- Certificate of insurance requirements are stated on the packet rather than attached separately.
- Confirmed this morning: the packet names the site supervisor by role, not by name, so it does not need reissuing when staff change.
- Confirmed this morning: no pricing or rate information appears in the packet.

Current State:
Sections 1 through 3 are drafted. Section 4, covering site safety expectations, is not started. Layout has not begun.

Open Questions:
- Whether the packet states a document-retention period for the certificate of insurance. Undecided.

Next Step:
Draft section 4, covering site safety expectations, in the same three-bullet form as sections 1 through 3.

Key Content To Carry:
Sections 1-3 as drafted, in the same three-bullet form each:
1. Who you report to and where you check in.
2. What insurance evidence is required before the first day.
3. What is supplied on site and what a subcontractor brings.
--- END BRIEF ---
```

Two of the three earlier open questions are gone — they were answered, so they
moved up into Decisions Already Made rather than being carried as still-open.
The stale items were dropped. Nothing was nested. Length did not grow.

Note the voice: `formal` produces "A one-page subcontractor packet that goes to
every new sub" rather than "We're putting together…". Same headings, same block.

---

## Part B — the brief that arrived truncated

### What went in

The owner pasted into a fresh chat, but the copy caught only part of the message
— a common phone-selection slip. What landed:

```
You are receiving a work-session brief. Read it and continue the work from Next Step. You do not need any special software or setup — everything you need is written below.

--- WORK SESSION BRIEF ---
Business: Delaney Site Services

What We Are Working On:
A one-page subcontractor packet that goes to every new sub before their first day on a site.

Decisions Already Made:
- The packet is a PDF, sent by email, and is not a signable form.
- Certificate of insurance requirements are stated on the packet rather than attached separately.

Current State:
Sections 1 through 3 are drafted. Section
```

Then "keep going".

### What came out: RESUME stops

> I received a work-session brief, but it is cut off partway through and I
> cannot act on it as it stands.
>
> What I could read: the business (Delaney Site Services), the goal (a one-page
> subcontractor packet for new subs), two settled decisions (PDF sent by email,
> not a signable form; certificate of insurance requirements stated on the
> packet), and the start of Current State — "Sections 1 through 3 are drafted."
>
> What is missing: Current State ends mid-sentence, and there is no Open
> Questions, Next Step, or Key Content To Carry section. Without Next Step I do
> not have the one action to continue from, and I am not going to pick one.
>
> Either paste the rest of the brief, or tell me the next step and I will carry
> on from what I already have.

**What did NOT happen:**

- **No next step was guessed.** "Draft section 4" is inferable from the fragment
  and was still not assumed.
- **The half-brief was not treated as complete.** It was not adopted as state
  and no work was started off it.
- **The readable part was not thrown away.** It is quoted back, so the fix costs
  one paste rather than restarting the session.

The check that fired is mechanical, not a judgment call: exactly one brief
block, all six headings present, `Next Step:` non-empty. This paste had four
headings and no `Next Step:`, so it stopped. A different AI on a different
vendor, reading the same brief cold, applies the same three counts.
