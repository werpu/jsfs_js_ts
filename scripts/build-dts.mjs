/*! Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Declaration bundling for dist/window/faces.d.ts and jsf.d.ts.
 *
 * Rolls the .d.ts files emitted by `tsc -p tsconfig.dts.json` (target/dts) up with
 * rollup-plugin-dts, post-processes faces.d.ts into a global declaration file,
 * then derives jsf.d.ts from it via deterministic text transforms
 * (JSF 2.3 shim differences).
 *
 * Usage (called by npm scripts):
 *   node scripts/build-dts.mjs
 */

import { rollup } from "rollup";
import { dts } from "rollup-plugin-dts";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync, writeFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// --- Step 1: roll up the emitted .d.ts files into dist/window/faces.d.ts ---

console.log("\nrollup-plugin-dts: bundling declarations");
const bundle = await rollup({
  input: resolve(projectRoot, "target/dts/src/main/typescript/api/_api.d.ts"),
  plugins: [dts({ respectExternal: true, compilerOptions: { skipLibCheck: true } })],
});
await bundle.write({ file: resolve(projectRoot, "dist/window/faces.d.ts"), format: "es" });
await bundle.close();
console.log("  ✔  faces.d.ts — rolled up");

// --- Step 2: post-process faces.d.ts into a global declaration file ---

/**
 * Walks forward from openIdx counting braces, returns the index of the
 * matching closing brace, or -1 if not found.
 */
function findClosingBrace(content, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < content.length; i++) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") {
      if (--depth === 0) return i;
    }
  }
  return -1;
}

/**
 * Converts the rolled up module output into a global declaration file:
 *
 *  A. Strips "export" from top-level namespace declarations so that
 *     "declare namespace faces { ... }" is a global ambient namespace,
 *     matching the runtime shape where faces/jsf hang off window.
 *
 *  B. Removes "export { }" which makes the file a TypeScript module
 *     (and therefore prevents global treatment).
 *
 *  D. Restores the "export" modifier on namespace members (rollup drops it).
 *
 *  C. Inlines the top-level "declare namespace oam { ... }" block as a
 *     nested "namespace oam { ... }" inside myfaces, fixing the
 *     self-referential "const oam: typeof oam" that the rollup output contains.
 */
function makeGlobalDeclaration(content) {
  content = content.replace(/\r\n/g, "\n");

  // A. Remove "export" from top-level namespace declarations.
  content = content.replace(/^export (declare namespace )/gm, "$1");

  // B. Remove the module-marker line.
  content = content.replace(/\nexport \{[^}]*\};?\s*$/, "\n");
  content = content.replace(/^\}\ndeclare namespace /gm, "}\n\ndeclare namespace ");

  // D. rollup-plugin-dts drops the "export" modifier of namespace members. Add it back
  //    to every member declaration, so the output stays identical to what api-extractor
  //    produced in earlier releases (importing projects may rely on it).
  content = content.replace(
    /^([ \t]+)(?!export )((?:declare )?(?:type|interface|const|function|namespace) )/gm,
    "$1export $2"
  );

  // C. Inline the top-level oam namespace into myfaces.
  const oamNeedle = "\ndeclare namespace oam {";
  const nsIdx = content.indexOf(oamNeedle);
  if (nsIdx !== -1) {
    const openIdx = content.indexOf("{", nsIdx + 1);
    const closeIdx = findClosingBrace(content, openIdx);
    if (closeIdx !== -1) {
      // Extract inner content, add 4 extra spaces of indentation, and make
      // each const member explicitly exported so myfaces.oam.X is accessible.
      const inner = content
        .slice(openIdx + 1, closeIdx)
        .split("\n")
        .map((l) => {
          if (!l.trim().length) return "";
          const indented = "    " + l;
          // Top-level oam members had no 'export' (redundant at global scope);
          // nested inside myfaces they need it for myfaces.oam.X to be visible.
          return indented.replace(/^([ \t]+)const /, "$1export const ");
        })
        .join("\n")
        .trimEnd();

      // Find the cut point: the blank line immediately before the top-level
      // JSDoc that precedes "declare namespace oam {".
      // Top-level JSDoc lines start at column 0 ("/**"), while JSDoc inside
      // namespaces is indented ("    /**"), so lastIndexOf("\n/**") safely
      // targets the oam JSDoc without matching inner comments.
      const jsdocAnchor = content.lastIndexOf("\n/**", nsIdx);
      const cutFrom = jsdocAnchor !== -1 ? jsdocAnchor : nsIdx;

      // Remove the top-level oam block first (preserves index validity for
      // the const-oam replacement that follows).
      content = content.slice(0, cutFrom) + content.slice(closeIdx + 1);
      content = content.trimEnd() + "\n";

      // Replace 'const oam: typeof oam;' with the inlined nested namespace.
      // 'export namespace' so that myfaces.oam is visible to TypeScript.
      content = content.replace(
        /^([ \t]*)(?:export )?const oam: typeof oam;/m,
        `$1export namespace oam {\n${inner}\n$1}`
      );
    }
  }

  return content;
}

const APACHE_HEADER =
  "/*! Licensed to the Apache Software Foundation (ASF) under one or more\n" +
  " * contributor license agreements.  See the NOTICE file distributed with\n" +
  " * this work for additional information regarding copyright ownership.\n" +
  " * The ASF licenses this file to you under the Apache License, Version 2.0\n" +
  ' * (the "License"); you may not use this file except in compliance with\n' +
  " * the License.  You may obtain a copy of the License at\n" +
  " *\n" +
  " *      http://www.apache.org/licenses/LICENSE-2.0\n" +
  " *\n" +
  " * Unless required by applicable law or agreed to in writing, software\n" +
  ' * distributed under the License is distributed on an "AS IS" BASIS,\n' +
  " * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" +
  " * See the License for the specific language governing permissions and\n" +
  " * limitations under the License.\n" +
  " */\n\n";

function postProcessFaces(facesPath) {
  let content = readFileSync(facesPath, "utf-8");
  content = makeGlobalDeclaration(content);
  // rollup keeps the license header of the entry file, avoid duplicating it
  content = content.replace(/^\/\*![\s\S]*?\*\/\s*/, "");
  content = APACHE_HEADER + content;
  writeFileSync(facesPath, content, "utf-8");
}

// --- Step 3: derive jsf.d.ts from the post-processed faces.d.ts ---

function generateJsfFromFaces(facesPath, jsfPath) {
  let content = readFileSync(facesPath, "utf-8");

  // Normalize line endings (faces.d.ts is already normalized by postProcessFaces,
  // but guard here in case this function is ever called standalone).
  content = content.replace(/\r\n/g, "\n");

  // 1. Rename the main "faces" namespace to "jsf".
  //    After postProcessFaces the declaration has no leading "export".
  content = content.replace(
    /^declare namespace faces \{/m,
    "declare namespace jsf {"
  );

  // 2. Fix cross-namespace references in myfaces: faces.ajax. → jsf.ajax.
  content = content.replace(/\bfaces\.ajax\./g, "jsf.ajax.");

  // 3. Remove the contextpath JSDoc comment block + var declaration.
  content = content.replace(
    /[ \t]+\/\*\*\n[ \t]+\* Context Path[^\n]*\n[ \t]+\*\/\n[ \t]+var contextpath: string;\n/,
    ""
  );

  // 4. Remove onerror param from push.init (not from ajax options).
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

postProcessFaces(facesPath);
console.log("  ✔  faces.d.ts — post-processed as global declaration");

generateJsfFromFaces(facesPath, jsfPath);
console.log("  ✔  jsf.d.ts — derived from faces.d.ts");
