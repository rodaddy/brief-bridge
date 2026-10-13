# tests

Maintainer-only checks. Nothing here is installed, zipped, or part of the buyer
path, and `installer.md` says so in its Package contents block and again in the
3B zip layout.

- `verify-install.mjs` -- asserts the required package files are present and
  scans for buyer-path files ending in `.mjs`, `.js`, `.ts`, `.py`, or `.sh`,
  with `tests/` as the one stated exemption, so the empty-dependency claim is
  checked rather than asserted.
- `brief-bridge.test.mjs` -- documentation-contract tests. The product is
  markdown an AI reads, so these assert the structural invariants of each rule
  (stop token, named enumeration of what is missing, no-invention clause,
  required headings) rather than exact prose.

Run with plain Node; they never enter the installed payload.
