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


import {Config} from "../../../main/typescript/_ext/monadish/Monad";

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
let dom = new JSDOM(`
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
    
    `)

let window = dom.window;


(<any>global).window = window;
(<any>global).body = window.document.body;
(<any>global).document = window.document;
(<any>global).navigator = {
    language: "en-En"
};

import {jsf} from "../../../main/typescript/api/jsf";
import {describe, it} from 'mocha';
import {expect} from 'chai';
import * as sinon from 'sinon';


import {DomQuery} from "../../../main/typescript/_ext/monadish/DomQuery";
import {Implementation} from "../../../main/typescript/impl/Impl";

(<any>global).jsf = jsf;
window.jsf = jsf;


/**
 * testing the jsf.ajax.request api without triggering any
 * xhr request...
 * the idea is to shim the code which triggers the request out and check what is going in
 * and what is coming out
 */

describe('jsf.ajax.request test suite', () => {
    beforeEach(() => {


    });

    it("jsf.ajax.request can be called", () => {
        //we stub the addRequestToQueue, to enable the request check only
        //without any xhr and response, both will be tested separately for
        //proper behavior
        let Impl = Implementation.instance;
        let addRequestToQueue = sinon.stub(Impl, "addRequestToQueue");
        //now the jsf.ajax.request should trigger but should not go into
        //the asynchronous event loop.
        //lets check it out

        try {
            DomQuery.byId("input_2").addEventListener("click", (event: Event) => {
                jsf.ajax.request(null, event, {render: '@all', execute: '@form'})
            }).click();

            expect(addRequestToQueue.called).to.be.true;
            expect(addRequestToQueue.callCount).to.eq(1);
            let argElement = <Config>addRequestToQueue.args[0][2];
            const context = (<Config>addRequestToQueue.args[0][2]);
            expect(context.getIf("passThrgh",Impl.P_RENDER).value).eq("@all");
            //Execute issuing form due to @form and always the issuing element
            expect(context.getIf("passThrgh",Impl.P_EXECUTE).value).eq("blarg input_2");
        } finally {
            //once done we restore the proper state
            addRequestToQueue.restore();
        }

    });
});