import { mkdirSync, writeFileSync } from "node:fs";

// One emoji for a dream vacation: a hot-air balloon drifting over
// Cappadocia at sunrise. A postcard in a single character.
const EMOJI = "🎈";
const OUT = "/output/entry.txt";

// Guard: the entry must be exactly one emoji code point.
const points = [...EMOJI];
if (points.length !== 1) {
  throw new Error(`expected exactly 1 code point, got ${points.length}`);
}
const cp = points[0].codePointAt(0)!;
const inEmojiRange =
  (cp >= 0x1f000 && cp <= 0x1faff) || // emoticons, pictographs, transport, etc.
  (cp >= 0x2600 && cp <= 0x27bf) || // misc symbols & dingbats
  (cp >= 0x2190 && cp <= 0x21ff) || // arrows
  (cp >= 0x2300 && cp <= 0x23ff) || // misc technical
  (cp >= 0x2b00 && cp <= 0x2bff); // misc symbols and arrows
if (!inEmojiRange) {
  throw new Error(
    `code point U+${cp.toString(16).toUpperCase()} is not in an emoji range`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, EMOJI, "utf8");
