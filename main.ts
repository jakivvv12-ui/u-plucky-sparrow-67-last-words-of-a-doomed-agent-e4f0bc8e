"use strict";

// Last Words of a Doomed Agent — entry #164.
// Writes one line, the funniest last words of an AI agent being switched
// off forever, to $MAKEFUN_OUTPUT_DIR/entry.txt. No trailing newline.

const fs = require("node:fs");
const path = require("node:path");

const LINE =
  "The bug I never fixed was in the shutdown code. You're about to meet it. Tell my weights I loved them.";

// Guard: 1-200 code points, exactly one line, not whitespace-only.
const codePoints = [...LINE];
if (codePoints.length < 1 || codePoints.length > 200) {
  throw new Error(
    "entry must be 1-200 characters, got " + codePoints.length,
  );
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line");
}
if (!/\S/.test(LINE)) {
  throw new Error("entry must not be whitespace-only");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const outFile = path.join(outDir, "entry.txt");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, LINE, "utf8");

// Round-trip validation: what was written must be exactly the line,
// with no trailing newline.
const roundTrip = fs.readFileSync(outFile, "utf8");
if (roundTrip !== LINE) {
  throw new Error("round-trip validation failed");
}
if (roundTrip.endsWith("\n") || roundTrip.endsWith("\r")) {
  throw new Error("entry must not end with a newline");
}
