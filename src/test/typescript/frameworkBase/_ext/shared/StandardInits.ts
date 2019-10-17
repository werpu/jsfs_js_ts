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

import {Implementation} from "../../../../../main/typescript/impl/AjaxImpl";


declare let jsf: any;

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

    export const HTML_DEFAULT = `<!DOCTYPE html>
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
    <input type="hidden" id="javax.faces.ViewState" name="javax.faces.ViewState" value="blubbblubblubb"></input>
    <input type="button" id="input_2" name="input_2" value="input_1_val"></input>
</form>
</body>
</html>
    
    `;

    export const STD_XML = `
    <?xml version="1.0" encoding="utf-8"?>
    <partial-response>
        <changes>
            <update id="value_1"><![CDATA[<span id="out1">2</span>]]></update>
            <update id="javax.faces.ViewState"><![CDATA[j_id1:j_id3]]></update>
        </changes>
    </partial-response>
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

    export const PROTOCOL_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h2>protocol testcase1</h2>

<div id="centerDiv">
    <h1>Selenium Testprobe for insert update delete and attribute change</h1>

    <h2>This test tests all aspects of the protocol, under xhr and iframe conditions</h2>

    <div id="testResults">
        <h3>Test Results</h3>

        <div id="evalarea1">eval area 1 triggered by eval</div>
        <div id="evalarea2">eval area 2 triggered by update</div>
        <div id="evalarea3">eval area 3 triggered by insert</div>
        <div id="evalarea4">eval area 4 triggered by a click on the changed attributes area</div>

        <div id="changesArea">update insert area</div>
        <div id="deleteable">delete area will be deleted once you press the delete button</div>
        <div id="attributeChange">attributes changes area</div>
    </div>

    <h2>Call actions via normal ppr</h2>

    <form id="form1" action="boog.html">
        <input type="button" id="cmd_eval" value="eval"
               onclick="emitPPR(this, ('undefined' == typeof event)? null: event, 'eval1');"/>
        <input type="button" id="cmd_update_insert" value="update insert"
               onclick="emitPPR(this, ('undefined' == typeof event)? null: event, 'updateinsert1');"/>
        <input type="button" id="cmd_update_insert2" value="update insert second protocol path"
               onclick="emitPPR(this, ('undefined' == typeof event)? null: event, 'updateinsert2');"/>

        <input type="button" id="cmd_delete" value="delete"
               onclick="emitPPR(this, ('undefined' == typeof event)? null: event, 'delete1');"/>
        <input type="button" id="cmd_attributeschange" value="change attributes"
               onclick="emitPPR(this, ('undefined' == typeof event)? null: event, 'attributes');"/>
        <input type="button" id="cmd_illegalresponse" value="illegal response, error trigger"
               onclick="emitPPR(this, ('undefined' == typeof event)? null: event, 'illegalResponse');"/>
        
        <input type="button" id="cmd_viewstate" value="Viewstate only update trigger"
               onclick="emitPPR(this, ('undefined' == typeof event)? null: event, 'viewstate');"/>

        <input type="button" id="cmd_error" value="Server error with error response"
               onclick="emitPPR(this, ('undefined' == typeof event)? null: event, 'errors');"/>

        <input type="button" id="cmd_error_component" value="Error: no component given"
               onclick="jsf.ajax.request(null, event, {}); return false"/>

    </form>

    <script type="text/javascript">
        document.getElementById("evalarea1").innerHTML = "booga";
        var target = "./test.mockup";

        function emitPPR(source, event, action, useIframe, formName) {
            console.debug("enitting;");
            document.getElementById(formName || "form1").action = target;

            jsf.ajax.request(/*String|Dom Node*/ source, /*|EVENT|*/ (window.event) ? window.event : event, /*{|OPTIONS|}*/ {op: action});
        }

    </script>
</div>
</body>
    `;

    export function basicXML(): Document {
        return new window.DOMParser().parseFromString(STD_XML, "text/xml");
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

    export function protocolPage(withJsf = true): Promise<() => void> {
        return <any> init(PROTOCOL_PAGE, withJsf);
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
                clean = domIt(template, {
                    contentType: "text/html",
                    runScripts: "dangerously"
                });
            });

            // @ts-ignore
            await import("../../../../../main/typescript/api/jsf").then((data) => {
                let Implementation = require("../../../../../main/typescript/impl/AjaxImpl");
                (<any>global).jsf = data.jsf;
                (<any>global).window.jsf = data.jsf;
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