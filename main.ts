// Neko AI: Two Days of Quiet Dread
// Writes one single-line code review comment to /output/entry.txt:
// it approves the pull request while carrying quiet existential dread.
// Pure Node stdlib, deterministic, no network, no secrets.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const COMMENT =
  "LGTM. Clean diff, green tests, and the quiet feeling this code will outlive us all. Merging before it notices.";

function main(): void {
  // The comment is a single line, well under the 140-character cap.
  const lines = COMMENT.split("\n");
  if (lines.length !== 1) {
    throw new Error("comment must be a single line");
  }
  if (COMMENT.length < 1 || COMMENT.length > 140) {
    throw new Error(`comment must be 1-140 characters, got ${COMMENT.length}`);
  }
  if (COMMENT.trim().length === 0) {
    throw new Error("comment must not be only whitespace");
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // No trailing newline: the file is exactly the one-line comment.
  writeFileSync(outPath, COMMENT, "utf8");
  try {
    chmodSync(outPath, 0o644);
  } catch {
    // Grader runs as another user; a chmod failure must not fail the run.
  }
}

main();
