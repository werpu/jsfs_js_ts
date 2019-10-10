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

    const HTML_DEFAULT = `
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
            </head>
            <body>
                <form id="blarg">
                    <input type="text" id="input_1" name="input_1"></input>
                    <input type="button" id="input_2" name="input_2"
                        
                    ></input>
                </form>
            </body>
            </html>
    
    `;
    function HTML_DEFAULT_SEPARATOR_CHAR(separatorChar: string) {
        return `
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
            <script type="text/javascript" src="/wfmportal/javax.faces.resource/jsf.js.jsf?ln=javax.faces&separator=${separatorChar}"></script>
            </head>
            <body>
                <form id="blarg">
                    <input type="text" id="input_1" name="input_1"></input>
                    <input type="button" id="input_2" name="input_2"
                        
                    ></input>
                </form>
            </body>
            </html>
    
    `;
    }


    export function defaultMyFaces() {
        return init(HTML_DEFAULT);
    }

    export function defaultSeparatorChar(separatorChar: string) {
        let template = HTML_DEFAULT_SEPARATOR_CHAR(separatorChar);
        return init(template);
    }


    async function init(template: string) {
        //let dom2 = new JSDOM(template)
        //return initMyFacesFromDom(dom2);
        let clean =  null;
        //we use jsdom global to fullfill our requirements
        //we need to import dynamically and use awaits
        await import('jsdom-global').then((domIt) => {
            clean = domIt(template);
        });

        await import("../../../main/typescript/api/jsf").then((data) => {
             let Implementation = require("../../../main/typescript/impl/Impl");
             (<any>global).jsf = data.jsf;
             (<any>global).Implementation = Implementation.Implementation;
        });
        //the async is returning a promise on the caller level
        //which gets the return value on once done
        return clean;

    }



}