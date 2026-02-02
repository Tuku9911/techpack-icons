// Simple script to normalize SVG fills so that icons respect className-based styles.
// Usage:
//   node scripts/fix-fills.js
//
// After running this, rebuild the package:
//   npm run build

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");

/** Recursively collect all .tsx and .ts files under a directory. */
function collectSourceFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
    } else if (entry.isFile() && (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts"))) {
      files.push(fullPath);
    }
  }

  return files;
}

/** Apply text replacements to make icons designable via className (currentColor). */
function transformContents(source) {
  let changed = source;

  // 1) Convert hard-coded black or white fills to currentColor.
  //    This covers most monochrome icons.
  changed = changed.replace(/fill="#000000"/gi, 'fill="currentColor"');
  changed = changed.replace(/fill="#000"/gi, 'fill="currentColor"');
  changed = changed.replace(/fill="#fff"/gi, 'fill="currentColor"');
  changed = changed.replace(/fill="#ffffff"/gi, 'fill="currentColor"');

  // 2) Convert SVG fill-opacity="0.45" to JSX fillOpacity={0.45}
  changed = changed.replace(/fill-opacity="([0-9]*\.?[0-9]+)"/gi, 'fillOpacity={$1}');

  // 3) If there are hard-coded black/white strokes, also make them currentColor.
  changed = changed.replace(/stroke="#000000"/gi, 'stroke="currentColor"');
  changed = changed.replace(/stroke="#000"/gi, 'stroke="currentColor"');
  changed = changed.replace(/stroke="#fff"/gi, 'stroke="currentColor"');
  changed = changed.replace(/stroke="#ffffff"/gi, 'stroke="currentColor"');

  return changed === source ? null : changed;
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error("src directory not found:", SRC_DIR);
    process.exit(1);
  }

  const files = collectSourceFiles(SRC_DIR);
  let modifiedCount = 0;

  for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    const transformed = transformContents(original);

    if (transformed != null) {
      fs.writeFileSync(file, transformed, "utf8");
      modifiedCount += 1;
      console.log("Updated:", path.relative(ROOT, file));
    }
  }

  console.log(`Done. Modified ${modifiedCount} file(s).`);
}

main();

