// These are DOCUMENTATION-CONTRACT tests, and the distinction matters.
//
// This kit's product is markdown that an AI reads, so there is no runtime to
// exercise: every check here reads shipped prose. The earlier version of this
// file pinned exact sentences (an em-dash in a heading, a specific line wrap in
// installer.md), which made it brittle against a harmless reflow while still
// passing on a rewrite that removed the guarantee. These tests instead assert
// the STRUCTURAL invariants each rule is made of — a stop token, a named
// enumeration of what is missing, a no-invention clause, the required
// headings — so a paraphrase that keeps the guarantee passes and a paraphrase
// that drops it fails.
//
// They still cannot prove an AI OBEYS the rule at runtime. That claim is made
// only by the clean-room boxes in README.md's acceptance checklist.

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

const kitRoot = process.env.BRIEF_BRIDGE_ROOT || new URL("..", import.meta.url).pathname;

async function read(relativePath) {
  return readFile(join(kitRoot, relativePath), "utf8");
}

/** Normalize punctuation and whitespace so wording is tested, not typography. */
function normalize(text) {
  return text
    .replace(/[‐-―−]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[ \s]+/g, " ");
}

/** The block of prose that states one refusal, from its stop token outward. */
function refusalBlocks(text) {
  const normalized = normalize(text);
  const blocks = [];
  const stop = /STOP\. ASK\./g;
  let match;
  while ((match = stop.exec(normalized)) !== null) {
    blocks.push(normalized.slice(Math.max(0, match.index - 600), match.index + 900));
  }
  return blocks;
}

const BRIEF_HEADINGS = [
  "What We Are Working On:",
  "Decisions Already Made:",
  "Current State:",
  "Open Questions:",
  "Next Step:",
  "Key Content To Carry:",
];

test("version records stay synchronized across VERSION, installer, and changelog", async () => {
  const [version, installer, changelog] = await Promise.all([
    read("VERSION"),
    read("installer.md"),
    read("CHANGELOG.md"),
  ]);
  const current = version.trim();
  const escaped = current.replaceAll(".", "\\.");

  assert.match(current, /^\d+\.\d+\.\d+$/);
  assert.match(installer, new RegExp(`\\*\\*Version:\\*\\* ${escaped}`));
  assert.match(changelog, new RegExp(`^## \\[${escaped}\\]`, "m"));
});

test("installer prose names no version literal other than the shipped one", async () => {
  const [version, installer] = await Promise.all([read("VERSION"), read("installer.md")]);
  const current = version.trim();

  // Catches the drift class where a hardcoded "this is v1.0" survives a bump.
  // Placeholders (v<new>, v<old>) are the correct spelling and are allowed; a
  // bare literal is not. A truncated prefix like `v1.0` on a 1.0.1 kit is the
  // exact defect this test exists for, so prefixes are NOT forgiven — the only
  // literal permitted anywhere in the prose is the full shipped version.
  const literals = [...installer.matchAll(/\bv(\d+(?:\.\d+)*)\b/g)].map((m) => m[1]);
  const stale = literals.filter((literal) => literal !== current);
  assert.deepEqual(
    stale,
    [],
    `installer.md names version literal(s) ${stale.join(", ")} but the kit ships ${current}; use the v<new> placeholder instead`,
  );
});

test("install verification refuses fixtures and requires buyer-owned work", async () => {
  const installer = normalize(await read("installer.md"));

  assert.match(installer, /buyer's own (?:real|current) work/i);
  assert.match(installer, /not the install session and not shipped demo text/i);
  assert.match(installer, /Leave the install \*\*unverified\*\*/);
  assert.match(installer, /\*\*PAUSE\*\*/);

  const verifyRefusal = refusalBlocks(installer).find((block) => /unverified/i.test(block));
  assert.ok(verifyRefusal, "Section 4 must carry a STOP. ASK. refusal that leaves the install unverified");
  // It shows its work: names the missing inputs, asks one question, invents nothing.
  assert.match(verifyRefusal, /goal/i);
  assert.match(verifyRefusal, /current state/i);
  assert.match(verifyRefusal, /next action/i);
  assert.match(verifyRefusal, /without inventing|do not (?:invent|substitute)|Do not substitute/i);
});

test("EMIT states a deterministic refusal that names the gap and never fills it", async () => {
  const skill = normalize(await read("skills/brief/SKILL.md"));

  for (const heading of BRIEF_HEADINGS) assert.match(skill, new RegExp(heading));

  const emitRefusal = refusalBlocks(skill).find((block) => /cannot identify/i.test(block));
  assert.ok(emitRefusal, "EMIT must carry a STOP. ASK. refusal for insufficient real state");
  // The three inputs whose absence triggers it, enumerated rather than implied.
  assert.match(emitRefusal, /goal/i);
  assert.match(emitRefusal, /current state/i);
  assert.match(emitRefusal, /next action/i);
  // No-invention clause, and no finished artifact produced past the gap.
  assert.match(emitRefusal, /invent/i);
  assert.match(emitRefusal, /without guessing|do not (?:guess|emit)/i);
  assert.match(emitRefusal, /Do not emit a finished brief/i);
});

test("RESUME validates a mechanical contract, not a vibe", async () => {
  const skill = normalize(await read("skills/brief/SKILL.md"));

  const resumeRefusal = refusalBlocks(skill).find((block) => /headings/i.test(block));
  assert.ok(resumeRefusal, "RESUME must carry a STOP. ASK. refusal on a malformed brief");
  // The three counts a script could make: one block, six headings, non-empty Next Step.
  assert.match(resumeRefusal, /exactly one/i);
  assert.match(resumeRefusal, /(?:all )?six headings/i);
  assert.match(resumeRefusal, /non-empty `Next Step`/i);
  // Every failure mode it must not paper over.
  assert.match(resumeRefusal, /missing/i);
  assert.match(resumeRefusal, /duplicated/i);
  assert.match(resumeRefusal, /Do not guess/i);
  assert.match(resumeRefusal, /merge duplicate blocks/i);
  // It states what it could read before asking.
  assert.match(resumeRefusal, /what you could read|could read and what failed/i);
});

test("multi-hop re-emit forbids nesting a prior brief", async () => {
  const skill = normalize(await read("skills/brief/SKILL.md"));

  assert.match(skill, /never nest, embed, quote, or append the earlier brief/i);
  assert.match(skill, /exactly ONE self-instructing first line and ONE/i);
});

test("filesystem upgrade backs up, replaces only shipped files, and stops on partial copy", async () => {
  const installer = normalize(await read("installer.md"));

  // Backup exists, is a copy (not a move), and is collision-safe.
  assert.match(installer, /back up the old skill folder/i);
  assert.match(installer, /copying it recursively/i);
  assert.match(installer, /never overwrite a backup/i);
  // Only shipped instruction files are replaced.
  assert.match(installer, /`SKILL\.md` and `OPERATIONS-MANUAL\.md`/);
  // The buyer's own data survives by construction.
  assert.match(installer, /Leave the entire live `brief\/branding\/` folder untouched/i);
  assert.match(installer, /Do NOT re-run the branding step/i);
  // Partial copy is a stop, not a success.
  assert.match(installer, /If any backup or copy step fails:[\s\S]{0,80}STOP/);
  assert.match(installer, /Never claim the upgrade succeeded after a partial copy/i);
});

test("chat-app upgrades (3B/3C) have their own backup and preserve path", async () => {
  const installer = normalize(await read("installer.md"));

  assert.match(installer, /Section 2\.5/);
  // 3B and 3C must both route through it, not just mention it once.
  const routed = [...installer.matchAll(/Run Section 2\.5 first/g)];
  assert.ok(routed.length >= 2, "3B and 3C must each be routed through Section 2.5");
  // The chat-app form of a backup: the user holds a copy, and we wait for them.
  assert.match(installer, /it is your rollback/i);
  assert.match(installer, /Never claim a backup you did not produce/i);
  // Their recorded name and voice carry forward without re-interviewing.
  assert.match(installer, /Do NOT re-run the branding interview on an upgrade/i);
  assert.match(installer, /verbatim/i);
  // Partial replacement stops here too.
  assert.match(installer, /Never call an upgrade complete after a partial replacement/i);
});

test("worked examples exist, are labelled invented, and are excluded from install", async () => {
  const examplesReadme = normalize(await read("examples/README.md"));
  const installer = normalize(await read("installer.md"));

  // Each named run is present and readable.
  const runs = [
    "01-desk-to-phone-complete.md",
    "02-refused-not-enough-state.md",
    "03-multi-hop-and-malformed.md",
  ];
  for (const run of runs) assert.match(examplesReadme, new RegExp(run.replaceAll(".", "\\.")));

  const bodies = await Promise.all(runs.map((run) => read(`examples/${run}`).then(normalize)));

  // A complete worked run shows the real brief block, not a summary of one.
  const complete = bodies[0];
  assert.match(complete, /--- WORK SESSION BRIEF ---/);
  assert.match(complete, /--- END BRIEF ---/);
  for (const heading of BRIEF_HEADINGS) assert.match(complete, new RegExp(heading));

  // The refusal example must show the kit producing nothing.
  const refused = bodies[1];
  assert.match(refused, /STOP\. ASK\./);
  assert.ok(
    !/--- END BRIEF ---/.test(refused.split("## What came out")[1] ?? ""),
    "the refusal example must not contain an emitted brief after the refusal",
  );

  // §4.10: shipped examples may never stand in for the buyer's own first run.
  assert.match(examplesReadme, /not your install test/i);
  assert.match(examplesReadme, /invented|made up/i);
  assert.match(installer, /not the install session and not shipped demo text/i);

  // Examples are reading material, not payload.
  assert.match(examplesReadme, /not copied into the installed skill/i);
  assert.match(installer, /exclude `tests\/` and `examples\/`/i);
});

test("the maintainer-only carve-out is stated where the copy instructions live", async () => {
  const [installer, readme] = await Promise.all([read("installer.md"), read("README.md")]);

  // Package contents must name the exclusion, not just omit tests/.
  assert.match(installer, /Never installed, never zipped/i);
  assert.match(installer, /`tests\/`/);
  // The 3B zip listing must forbid script extensions outright.
  assert.match(installer, /no file whose name ends in `\.mjs`/i);
  // README states the maintainer Node floor (22.6.0+), not a wrong one.
  assert.match(readme, /22\.6\.0\+/);
  assert.doesNotMatch(readme, /Node 1[0-9]\b/);
});
