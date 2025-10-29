import fg from "fast-glob";
import fs from "fs";

const files = await fg(["app/**/*.{ts,tsx}"]);
const textRegex = />\s*([^<>{}]+)\s*</g; // capture visible text between JSX tags

const texts = new Set();

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  let match;
  while ((match = textRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text && !text.startsWith("{") && /[a-zA-Z]/.test(text)) {
      texts.add(text);
    }
  }
}

const result = Array.from(texts).reduce((acc, text) => {
  acc[text.replace(/\s+/g, "_").toLowerCase()] = text;
  return acc;
}, {});

fs.writeFileSync("extracted-texts.json", JSON.stringify(result, null, 2));
console.log("✅ Extracted texts to extracted-texts.json");
