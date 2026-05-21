/**
 * Programmatic api-extractor runner.
 * Suppresses the "bundled TypeScript is older than project" noise that appears
 * when the project uses a newer TypeScript than api-extractor bundles.
 *
 * After running api-extractor for faces, derives jsf.d.ts from faces.d.ts
 * via deterministic text transforms (JSF 2.3 shim differences).
 *
 * Usage (called by npm scripts):
 *   node scripts/build-dts.mjs   — run faces api-extractor then generate jsf.d.ts
 */

import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync, writeFileSync } from "fs";

// Suppress the "bundled TypeScript / newer than bundled" noise from api-extractor.
// These informational lines are printed to stdout via api-extractor's internal terminal.
function makeSuppressingWriter(original) {
  return function (chunk, ...args) {
    const text = typeof chunk === "string" ? chunk : chunk.toString();
    if (
      text.includes("bundled TypeScript version") ||
      text.includes("newer than the bundled compiler engine")
    ) {
      return true;
    }
    return original.call(this, chunk, ...args);
  };
}
process.stdout.write = makeSuppressingWriter(process.stdout.write.bind(process.stdout));
process.stderr.write = makeSuppressingWriter(process.stderr.write.bind(process.stderr));

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// Resolve the local TypeScript compiler installed in the project.
const typescriptCompilerFolder = resolve(projectRoot, "node_modules", "typescript");

// --- Step 1: run api-extractor for faces.d.ts ---

const configPath = resolve(projectRoot, "api-extractor.faces.json");
console.log(`\napi-extractor: processing api-extractor.faces.json`);

const extractorConfig = ExtractorConfig.loadFileAndPrepare(configPath);

const result = Extractor.invoke(extractorConfig, {
  localBuild: true,
  typescriptCompilerFolder,
  showVerboseMessages: false,
});

if (!result.succeeded) {
  console.error("  ✖  api-extractor.faces.json — FAILED");
  process.exit(1);
}
console.log("  ✔  api-extractor.faces.json — completed successfully");

// --- Step 2: derive jsf.d.ts from faces.d.ts ---

function generateJsfFromFaces(facesPath, jsfPath) {
  let content = readFileSync(facesPath, "utf-8");

  // Normalize line endings so all regex patterns can use \n unconditionally.
  content = content.replace(/\r\n/g, "\n");

  // 1. Rename the main "faces" namespace export to "jsf".
  //    Only the namespace declaration line, not the cross-namespace "faces." references.
  content = content.replace(
    /^export declare namespace faces \{/m,
    "export declare namespace jsf {"
  );

  // 2. Fix cross-namespace references in myfaces: faces.ajax. → jsf.ajax.
  content = content.replace(/\bfaces\.ajax\./g, "jsf.ajax.");

  // 3. Remove the contextpath JSDoc comment block + var declaration.
  //    Matches:  /**\n     * Context Path ...\n     */\n    var contextpath: string;\n
  content = content.replace(
    /[ \t]+\/\*\*\n[ \t]+\* Context Path[^\n]*\n[ \t]+\*\/\n[ \t]+var contextpath: string;\n/,
    ""
  );

  // 4. Remove onerror param from push.init (only the init line, not ajax onerror).
  content = content.replace(
    / onerror: OnErrorHandler \| string \| null,/,
    ""
  );

  // 5. Remove the @param onerror JSDoc line — first occurrence only (push.init jsdoc).
  content = content.replace(
    /\n[ \t]*\* @param onerror The function to be invoked when an error occurs\./,
    ""
  );

  writeFileSync(jsfPath, content, "utf-8");
}

const facesPath = resolve(projectRoot, "dist/window/faces.d.ts");
const jsfPath = resolve(projectRoot, "dist/window/jsf.d.ts");

generateJsfFromFaces(facesPath, jsfPath);
console.log("  ✔  jsf.d.ts — derived from faces.d.ts");
