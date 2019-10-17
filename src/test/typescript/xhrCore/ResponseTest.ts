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

import {describe} from "mocha";
import {standardInits} from "../frameworkBase/_ext/shared/StandardInits";
import * as sinon from "sinon";

import {DomQuery} from "../../../main/typescript/_ext/monadish";
import {XmlResponses} from "../frameworkBase/_ext/shared/XmlResponses";
import {expect} from "chai";
import protocolPage = standardInits.protocolPage;

declare var jsf: any;
declare var Implementation: any;

/**
 * response test
 * the idea is simply to pass in a dom
 * the context and a response xml and then check what happens
 * we do not need to to through the entire ajax cyle for that.
 */
describe('Tests of the various aspects of the response protocol functionality', function () {

    beforeEach(async function () {
        let waitForResult = protocolPage();
        return waitForResult.then((close) => {
            this.server = sinon.fakeServer.create();
            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = (xhr) => {
                this.requests.push(xhr);
            };
            (<any>global).XMLHttpRequest = this.xhr;
            (<any>window).XMLHttpRequest = this.xhr;

            this.closeIt = () => {
                (<any>global).XMLHttpRequest = (<any>window).XMLHttpRequest = this.xhr.restore();
                Implementation.reset();
                close();
            }
        });
    });

    afterEach(function () {
        this.closeIt();
    });

    it("must have a simple field updated as well as the viewstate", function (done) {
        //DomQuery.byId("cmd_update_insert").click();
        let issuer = DomQuery.byId("cmd_update_insert").getAsElem(0).value;
        jsf.ajax.request(issuer, {
            target: issuer
        }, {})
        let xhrReq = this.requests[0];
        xhrReq.responsetype = "text/xml";
        xhrReq.respond(200, {'Content-Type': 'text/xml'}, XmlResponses.UPDATE_INSERT_1);

        expect(DomQuery.byId("changesArea")
            .html()
            .orElse("fail")
            .value.indexOf("update succeeded 1") != -1)
            .to.be.true;

        let pos1 = (<string>DomQuery.byId(document.body).html()
            .value).indexOf("insert before succeeded should display before test1");
        let pos3 = (<string>DomQuery.byId(document.body).html()
            .value).indexOf("insert after succeeded should display after test1");
        let pos2 = (<string>DomQuery.byId(document.body).html()
            .value).indexOf("update succeeded 1");

        expect(pos1 != -1).to.be.true;

        expect(pos1 < pos2 && pos2 < pos3).to.be.true;

        let pos4 = (<string>DomQuery.byId(document.body).html()
            .value).indexOf("embedded script at update succeed");

        expect(pos4 != -1).to.be.true;

        done();
    });

    it("must have a full body update", () => {

    });

    it("must have am embedded script properly executed", () => {

    });

    it("must have processed a proper insertBefore", () => {

    });

    it("must have processed a proper insertAfter", () => {

    });

    it("must have processed a proper delete", function ()  {
        //DomQuery.byId("cmd_update_insert").click();
        let issuer = DomQuery.byId("cmd_delete").getAsElem(0).value;
        jsf.ajax.request(issuer, {
            target: issuer
        }, {})
        let xhrReq = this.requests[0];
        xhrReq.responsetype = "text/xml";
        xhrReq.respond(200, {'Content-Type': 'text/xml'}, XmlResponses.DELETE_1);

        expect(DomQuery.byId("deletable").isAbsent()).to.be.true;

    });

    it("must have processed a proper eval of a script given in the eval tag", () => {

    });

    //TODO update head all and redirect
});