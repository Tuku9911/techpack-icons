const fs = require("fs");
const path = require("path");

// Root of your techpack workspace
const ROOT = path.resolve(__dirname, "..");

// Folders that contain the source SVGs
const SOURCES = [
  { dir: "1- Light", suffix: "Light" },
  { dir: "2- Regular", suffix: "Regular" },
  { dir: "3- Bold", suffix: "Bold" },
  { dir: "4- Filled", suffix: "Filled" },
];

// Output folder for generated React components
const OUT_DIR = path.join(ROOT, "icons", "src");

function toPascalCase(name) {
  return name
    .replace(/\.svg$/i, "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function processSvgContent(rawSvg) {
  let svg = rawSvg.toString();

  // Remove <defs> ... </defs> (used for styles like .cls-1)
  svg = svg.replace(/<defs>[\s\S]*?<\/defs>/gi, "");

  // Drop any style tags just in case
  svg = svg.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // Remove class attributes from elements
  svg = svg.replace(/\sclass="[^"]*"/gi, "");
  svg = svg.replace(/\sclass='[^']*'/gi, "");

  // Convert SVG kebab-case attributes to React camelCase
  svg = svg.replace(/\sclip-rule=/gi, " clipRule=");
  svg = svg.replace(/\sfill-rule=/gi, " fillRule=");
  svg = svg.replace(/\sstroke-width=/gi, " strokeWidth=");
  svg = svg.replace(/\sstroke-linecap=/gi, " strokeLinecap=");
  svg = svg.replace(/\sstroke-linejoin=/gi, " strokeLinejoin=");
  svg = svg.replace(/\sstroke-dasharray=/gi, " strokeDasharray=");
  svg = svg.replace(/\sstroke-dashoffset=/gi, " strokeDashoffset=");
  svg = svg.replace(/\sclip-path=/gi, " clipPath=");
  svg = svg.replace(/\sstop-color=/gi, " stopColor=");
  svg = svg.replace(/\sstop-opacity=/gi, " stopOpacity=");
  svg = svg.replace(/\sstroke-miterlimit=/gi, " strokeMiterlimit=");
  svg = svg.replace(/\sfill-opacity=/gi, " fillOpacity=");

  // Replace hardcoded fill on inner elements with currentColor so text-* / className colors work
  svg = svg.replace(/\sfill="(?!none|currentColor)[^"]*"/gi, ' fill="currentColor"');
  svg = svg.replace(/\sfill='(?!none|currentColor)[^']*'/gi, " fill=\"currentColor\"");

  // Ensure root <svg> uses currentColor and accepts React props
  svg = svg.replace(
    /<svg([^>]*)>/i,
    (match, attrs) => {
      // Remove any existing fill on the root svg
      let cleaned = attrs.replace(/\sfill="[^"]*"/gi, "").replace(/\sfill='[^']*'/gi, "");
      // Inject React props and className
      return `<svg${cleaned} fill="currentColor" {...props} className={className}>`;
    }
  );

  // Replace closing svg just to be safe (no change, but ensures there's exactly one)
  // (We keep it as is)

  // Convert any SVG class attribute variants to React friendly (already removed above)

  return svg.trim();
}

function generateComponent(componentName, jsxSvg) {
  return `import React from "react";

export const ${componentName} = ({ className, ...props }: any) => (
  ${jsxSvg}
);
`;
}

function main() {
  ensureDir(OUT_DIR);

  const exportLines = [];
  const seenComponents = new Set();

  for (const { dir, suffix } of SOURCES) {
    const srcDir = path.join(ROOT, dir);
    if (!fs.existsSync(srcDir)) {
      console.warn("Source directory not found:", srcDir);
      continue;
    }

    const files = fs.readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith(".svg"));

    for (const file of files) {
      const baseName = toPascalCase(file);
      const componentName = `${baseName}${suffix}`;
      
      // Skip if we've already generated this component
      if (seenComponents.has(componentName)) {
        console.warn("Skipping duplicate:", componentName);
        continue;
      }
      
      seenComponents.add(componentName);
      const svgPath = path.join(srcDir, file);

      const rawSvg = fs.readFileSync(svgPath, "utf8");
      const jsxSvg = processSvgContent(rawSvg);

      const componentCode = generateComponent(componentName, jsxSvg);
      const outFile = path.join(OUT_DIR, `${componentName}.tsx`);
      fs.writeFileSync(outFile, componentCode, "utf8");

      exportLines.push(`export { ${componentName} } from "./${componentName}";`);
      console.log("Generated", componentName);
    }
  }

  // Create index.ts that exports all components
  const indexPath = path.join(OUT_DIR, "index.ts");
  fs.writeFileSync(indexPath, exportLines.join("\n") + "\n", "utf8");
  console.log("Wrote index.ts with", exportLines.length, "icons");
}

main();

