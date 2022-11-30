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

import {describe, it} from "mocha";
import * as sinon from "sinon";
import {expect} from "chai";
import {StandardInits} from "../frameworkBase/_ext/shared/StandardInits";
import {DomQuery} from "mona-dish";
import {
    COMPLETE,
    P_AJAX,
    P_EXECUTE,
    P_PARTIAL_SOURCE,
    P_RENDER,
    P_VIEWSTATE,
    P_WINDOW_ID,
    SUCCESS
} from "../../impl/core/Const";
import defaultMyFaces = StandardInits.defaultMyFaces;
import STD_XML = StandardInits.STD_XML;
import defaultMyFacesNamespaces = StandardInits.defaultMyFacesNamespaces;
import {escape} from "querystring";

declare var faces: any;
declare var Implementation: any;

let issueStdReq = function (element) {
    faces.ajax.request(element, null, {
        execute: "input_1",
        render: "@form",
        params: {
            pass1: "pass1",
            pass2: "pass2"
        }
    });
};

describe('Namespacing tests', function () {
    beforeEach(async function () {

        let waitForResult = defaultMyFacesNamespaces();

        return waitForResult.then((close) => {

            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = (xhr) => {
                this.requests.push(xhr);
            };
            (<any>global).XMLHttpRequest = this.xhr;
            window.XMLHttpRequest = this.xhr;

            this.jsfAjaxResponse = sinon.spy((<any>global).faces.ajax, "response");

            this.closeIt = () => {
                (<any>global).XMLHttpRequest = window.XMLHttpRequest = this.xhr.restore();
                this.jsfAjaxResponse.restore();
                Implementation.reset();
                close();
            }
        });
    });

    afterEach(function () {
        this.closeIt();
    });

    it('must send the element identifiers properly encoded', function () {
        let send = sinon.spy(XMLHttpRequest.prototype, "send");
        try {
            faces.ajax.request(document.getElementById("jd_0:input_2"), null, {
                execute: ":input_1",
                render: ":blarg :input2",
                params: {
                    pass1: "pass1",
                    pass2: "pass2"
                }
            });

            expect(send.called).to.be.true;
            let argsVal: any = send.args[0][0];
            let arsArr = argsVal.split("&");
            let resultsMap = {};
            for (let val of arsArr) {
                let keyVal = val.split("=");
                resultsMap[keyVal[0]] = keyVal[1];
            }

            expect(resultsMap["pass1"]).to.eq("pass1");
            expect(resultsMap["pass2"]).to.eq("pass2");
            expect(!!resultsMap["render"]).to.be.false;
            expect(!!resultsMap["execute"]).to.be.false;
            expect(P_WINDOW_ID in resultsMap).to.be.false;
            expect(P_VIEWSTATE in resultsMap).to.be.true;
            expect(resultsMap[P_PARTIAL_SOURCE]).to.eq(escape("jd_0:input_2"));
            expect(resultsMap[P_AJAX]).to.eq("true");
            expect(resultsMap[P_RENDER]).to.eq(escape("jd_0:blarg jd_0:input2"));
            expect(resultsMap[P_EXECUTE]).to.eq(escape("jd_0:input_1 jd_0:input_2"));
        } finally {
            send.restore();
        }
    })

});