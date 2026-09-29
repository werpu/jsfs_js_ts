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
// AI-generated: this file was created with assistance from Claude (Anthropic) — see AI_CONTRIBUTIONS.md
import {describe} from "mocha";
import {expect} from "chai";
import {existsSync, readFileSync} from "fs";
import {resolve} from "path";
import {JSDOM} from "jsdom";

/**
 * Smoke test for the built bundles in dist/window.
 * The regular specs run against the TypeScript sources, so nothing else notices when the bundler
 * (webpack + esbuild-loader) produces a broken or incomplete bundle.
 * Every bundle is evaluated in its own isolated JSDOM window, no globals are touched.
 * Run `npm run build-bundles` first if the dist files are stale.
 */
const DIST = resolve(__dirname, "../../../../../dist/window");

const BUNDLES: { file: string, namespace: "faces" | "jsf" }[] = [
    {file: "faces.js", namespace: "faces"},
    {file: "faces-development.js", namespace: "faces"},
    {file: "jsf.js", namespace: "jsf"},
    {file: "jsf-development.js", namespace: "jsf"},
];

type Dom = InstanceType<typeof JSDOM>;

function loadBundle(file: string): Dom {
    const dom = new JSDOM(
        `<!DOCTYPE html><html><head></head><body>
            <form id="form1"><input type="hidden" id="form1:input" name="form1:input" value="x"/></form>
        </body></html>`,
        {runScripts: "outside-only", url: "http://localhost/"}
    );
    dom.window.eval(readFileSync(resolve(DIST, file), "utf-8"));
    return dom;
}

describe("Built bundles in dist/window", function () {

    BUNDLES.forEach(({file, namespace}) => {
        describe(file, function () {
            let dom: Dom;

            before(function () {
                expect(existsSync(resolve(DIST, file)), `${file} missing, run npm run build-bundles`).to.be.true;
                dom = loadBundle(file);
            });

            after(function () {
                dom?.window.close();
            });

            it(`evaluates without errors and exposes window.${namespace}`, function () {
                expect((dom.window as any)[namespace]).to.exist;
            });

            it("exposes the core ajax api", function () {
                const api = (dom.window as any)[namespace];
                expect(api.ajax.request).to.be.a("function");
                expect(api.ajax.response).to.be.a("function");
                expect(api.ajax.addOnError).to.be.a("function");
                expect(api.ajax.addOnEvent).to.be.a("function");
                expect(api.getViewState).to.be.a("function");
                expect(api.getProjectStage).to.be.a("function");
            });

            it("exposes the util and push apis", function () {
                const api = (dom.window as any)[namespace];
                expect(api.util.chain).to.be.a("function");
                expect(api.push.init).to.be.a("function");
            });

            it("reports a valid project stage", function () {
                const api = (dom.window as any)[namespace];
                expect(api.getProjectStage()).to.be.oneOf(["Production", "Development", "SystemTest", "UnitTest"]);
            });

            it("serializes the view state of a form", function () {
                const api = (dom.window as any)[namespace];
                const viewState = api.getViewState(dom.window.document.getElementById("form1"));
                expect(viewState).to.contain("form1%3Ainput=x");
            });
        });
    });

    it("the faces and jsf bundles differ only in the exposed namespace shims", function () {
        const faces = loadBundle("faces.js");
        const jsf = loadBundle("jsf.js");
        try {
            expect((faces.window as any).jsf, "faces.js must not define window.jsf").to.be.undefined;
            expect((jsf.window as any).jsf).to.exist;
        } finally {
            faces.window.close();
            jsf.window.close();
        }
    });
});
