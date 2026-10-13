import { lstat, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = process.env.BRIEF_BRIDGE_ROOT || new URL("..", import.meta.url).pathname;
const required = [
  "START-HERE.md",
  "installer.md",
  "OPERATIONS-MANUAL.md",
  "README.md",
  "VERSION",
  "CHANGELOG.md",
  "skills/brief/SKILL.md",
  "examples/README.md",
];

let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`FAIL verify-install: ${message}`);
  process.exitCode = 1;
}

for (const relativePath of required) {
  const path = join(root, relativePath);
  try {
    const stat = await lstat(path);
    if (!stat.isFile()) fail(`${relativePath} is not a regular file`);
    if (stat.isSymbolicLink()) fail(`${relativePath} must not be a symlink`);
  } catch (error) {
    fail(`${relativePath} is missing: ${error.message}`);
  }
}

// Every check below reads a required file. If any required file is missing or
// unreadable, reading it again would throw an uncaught exception and hide the
// deterministic failures already reported above. Stop here instead.
if (failures) {
  console.error(`FAIL verify-install: ${failures} required-file problem(s); skipping content checks`);
  process.exit(1);
}

const skill = await readFile(join(root, "skills/brief/SKILL.md"), "utf8");
if (!/^---\n[\s\S]*?^name: brief$/m.test(skill)) fail("SKILL.md frontmatter must declare name: brief");

const installer = await readFile(join(root, "installer.md"), "utf8");
for (const section of ["Section 3A", "Section 3B", "Section 3C", "Section 3D", "Section 4: Verify", "Section 5: If Anything Fails"]) {
  if (!installer.includes(section)) fail(`installer is missing ${section}`);
}

// The buyer path must ship no runtime script. `tests/` is the maintainer-only
// carve-out README.md and installer.md both declare, and it is excluded from
// every install and zip layout — so it is exempt here and nowhere else.
// .mjs/.cjs/.js are scanned too: omitting them is what let this guard's own
// two files sit invisible to the guard that exists to prove the floor is empty.
const buyerRuntimeScript = /\.(?:ts|mts|cts|js|mjs|cjs|py|sh|bash|rb|pl)$/;
const maintainerOnly = /^tests(\/|$)/;
const entries = await readdir(root, { recursive: true });
for (const entry of entries) {
  const normalized = entry.split("\\").join("/");
  if (/(^|\/)\.DS_Store$|(^|\/)__MACOSX(\/|$)/.test(normalized)) fail(`OS junk present: ${normalized}`);
  if (maintainerOnly.test(normalized)) continue;
  if (buyerRuntimeScript.test(normalized)) fail(`unexpected buyer runtime script: ${normalized}`);
}

// The tests/ carve-out is only true if the package tells the installer to leave
// it behind. Assert the exclusion is stated where the copy instructions live.
if (!/tests\//.test(installer) || !/not (?:copied|part of)/i.test(installer)) {
  fail("installer.md must state that tests/ is maintainer-only and is not copied into the install");
}

if (!process.exitCode) console.log(`PASS verify-install brief-bridge@${(await readFile(join(root, "VERSION"), "utf8")).trim()}`);
