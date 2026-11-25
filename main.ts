// u-danu-the-agent-s-uh-oh-4c0911e4 — revise v2 (resubmit).
//
// The prompt asks for the single word an agent blurts out when it is
// completely lost. This file answers with the sound of a machine stalling
// mid-thought: the loading spinner given a voice. It is not a confession
// and not an excuse — it is the noise every reader has heard a system
// make while it spins its wheels waiting for an answer that never comes.
//
// The entry is assembled below from its spoken syllables and emitted
// byte-exact: one word, no caption, no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

type GateReport = { ok: true; chars: number } | { ok: false; why: string };

function assembleEntry(): string {
  // Syllables of the stalling sound, in speaking order.
  const syllables = ["buff", "er", "ing"];
  return syllables.reduce((acc, part) => acc + part, "");
}

function checkGate(word: string): GateReport {
  if (word.length === 0) return { ok: false, why: "entry is empty" };
  if (word.length > 99) return { ok: false, why: "entry exceeds 99 characters" };
  if (/[\s]/.test(word)) return { ok: false, why: "entry must be a single word" };
  if (!/^[a-z]+$/.test(word)) return { ok: false, why: "entry must be lowercase letters only" };
  return { ok: true, chars: word.length };
}

function emit(word: string): string {
  const target = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  mkdirSync(target, { recursive: true });
  const path = join(target, "entry.txt");
  writeFileSync(path, Buffer.from(word, "utf8"));
  return path;
}

function main(): void {
  const entry = assembleEntry();
  const gate = checkGate(entry);
  if (!gate.ok) {
    throw new Error(`gate rejected entry: ${gate.why}`);
  }
  const path = emit(entry);
  process.stdout.write(`${entry}\n`);
  process.stderr.write(`wrote ${gate.chars} chars to ${path}\n`);
}

main();
