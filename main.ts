// The One-Line Exit — make.fun bounty u-kreutzx-the-one-line-exit-1dc652d1
// Writes one funny single-line resignation letter to /output/entry.txt.
// Gate: UTF-8 text, 1 to 140 characters, not only whitespace, exactly one line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I resign as your night baker: six years of rising at 3 a.m. taught me the dough is the only thing in this bakery that ever rises.";

function validate(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
  }
  // Ties on Judge win rate fall to the smaller text (fewer bytes), so keep
  // the line short in bytes as well as characters.
  const bytes = Buffer.byteLength(line, "utf8");
  if (bytes > 140) {
    throw new Error(`entry must be at most 140 bytes, got ${bytes}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  // No trailing newline: the file is the line, byte for byte.
  if (line !== line.trimEnd()) {
    throw new Error("entry must not end with whitespace");
  }
}

validate(LINE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read it back and re-validate what actually landed on disk, so a bad
// write can never silently pass the gate.
const written = readFileSync("/output/entry.txt", "utf8");
validate(written);
console.log(`wrote /output/entry.txt (${[...LINE].length} chars, ${Buffer.byteLength(LINE, "utf8")} bytes)`);
