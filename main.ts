// The Agent's Uh-Oh — one word an agent blurts out when it is completely
// lost. The entry is the machine's own confession: caught mid-task, out of
// ideas, admitting it is making things up as it goes. One word, no caption,
// no explanation — just the blurt, exactly as an agent would say it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "hallucinating";

// The gate wants 1-99 characters, a single word, nothing attached.
const MAX_LENGTH = 99;
if (
  ENTRY.length < 1 ||
  ENTRY.length > MAX_LENGTH ||
  /\s/.test(ENTRY)
) {
  throw new Error("entry must be one word of 1-99 characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
