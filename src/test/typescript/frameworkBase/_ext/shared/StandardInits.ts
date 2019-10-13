/* Licensed to the Apache Software Foundation (ASF) under one or more
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

import {Implementation} from "../../../../../main/typescript/impl/Impl";

/**
 * helpers with various init and html patterns
 *
 * We use jsdom global which builds up a
 * dom tree and emulates a full environment
 *
 * Note the buildup and loading is asynchronous so
 * we have to work with Promises and asyncs to get things
 * where we want to have them
 *
 * This is a pattern pretty much for every test which iterates over
 * multiple doms
 */
export module standardInits {

    const HTML_DEFAULT = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="id_1"></div>
<div id="id_2" booga="blarg"></div>
<div id="id_3"></div>
<div id="id_4"></div>
</body>
</html>
    `;

    const HTML_FORM_DEFAULT = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form id="blarg">
    <input type="text" id="input_1" name="input_1" value="input_1_val"></input>
    <input type="button" id="input_2" name="input_2" value="input_1_val"></input>
</form>
</body>
</html>
    
    `;

    function HTML_DEFAULT_SEPARATOR_CHAR(separatorChar: string) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript"
            src="/wfmportal/javax.faces.resource/jsf.js.jsf?ln=javax.faces&separator=${separatorChar}"></script>
</head>
<body>
<form id="blarg">
    <input type="text" id="input_1" name="input_1"/>
    <input type="button" id="input_2" name="input_2"/>
</form>
</body>
</html>
    
    `;
    }

    export function standardInit(scope: any, initFunc: (boolean) => Promise<() => void> = defaultHtml): Promise<any> {
        (<any>global).navigator = {
            language: "en-En"
        };
        return initFunc(false).then((closeFunc: Function) => {
            (<any>scope).currentTest.closeIt = () => {
                closeFunc();
                delete (<any>global).navigator;
            }
        });
    }

    export function standardClose(scope: any) {
        (<any>scope).currentTest.closeIt();
    }

    export function defaultHtml(withJsf = true): Promise<() => void> {
        return init(HTML_DEFAULT, withJsf);
    }

    export function defaultMyFaces(withJsf = true): Promise<() => void> {
        return init(HTML_FORM_DEFAULT, withJsf);
    }

    export function defaultSeparatorChar(separatorChar: string, withJsf = true): Promise<() => void> {
        let template = HTML_DEFAULT_SEPARATOR_CHAR(separatorChar);
        return init(template, withJsf);
    }

    async function init(template: string, withJsf = true): Promise<() => void> {
        //let dom2 = new JSDOM(template)
        //return initMyFacesFromDom(dom2);
        let clean = null;
        //we use jsdom global to fullfill our requirements
        //we need to import dynamically and use awaits
        if (withJsf) {
            delete (<any>global).jsf;
            delete (<any>global).Implementation;
            Implementation.reset();

            // @ts-ignore
            await import('jsdom-global').then((domIt) => {
                clean = domIt(template);
            });

            // @ts-ignore
            await import("../../../../../main/typescript/api/jsf").then((data) => {
                let Implementation = require("../../../../../main/typescript/impl/Impl");
                (<any>global).jsf = data.jsf;
                (<any>global).Implementation = Implementation.Implementation;
            });
        } else {
            // @ts-ignore
            await import('jsdom-global').then((domIt) => {
                clean = domIt(template);
            });
        }
        //the async is returning a promise on the caller level
        //which gets the return value on once done
        return clean;

    }
}