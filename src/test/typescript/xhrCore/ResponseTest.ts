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
import {StandardInits} from "../frameworkBase/_ext/shared/StandardInits";
import * as sinon from "sinon";


import {XmlResponses} from "../frameworkBase/_ext/shared/XmlResponses";
import {expect} from "chai";
import protocolPage = StandardInits.protocolPage;
import {DQ} from "../../../main/typescript/ext/monadish/DomQuery";
import {Optional} from "../../../main/typescript/ext/monadish";

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

            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];

            this.respond = (response: string): XMLHttpRequest => {
                let xhrReq = this.requests.shift();
                xhrReq.responsetype = "text/xml";
                xhrReq.respond(200, {'Content-Type': 'text/xml'}, response);
                return xhrReq;
            };

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
        //DQ.byId("cmd_update_insert").click();
        let issuer = DQ.byId("cmd_update_insert").click();

        this.respond(XmlResponses.UPDATE_INSERT_1);

        expect(DQ.byId("changesArea")
            .html()
            .orElse("fail")
            .value.indexOf("update succeeded 1") != -1)
            .to.be.true;

        let pos1 = (<string>DQ.byId(document.body).html()
            .value).indexOf("insert before succeeded should display before test1");
        let pos3 = (<string>DQ.byId(document.body).html()
            .value).indexOf("insert after succeeded should display after test1");
        let pos2 = (<string>DQ.byId(document.body).html()
            .value).indexOf("update succeeded 1");

        expect(pos1 != -1).to.be.true;

        expect(pos1 < pos2 && pos2 < pos3).to.be.true;

        let pos4 = (<string>DQ.byId(document.body).html()
            .value).indexOf("embedded script at update succeed");

        expect(pos4 != -1).to.be.true;

        done();
    });


    it("must have a simple field updated  with the second before update rendering path", function (done) {
        //DQ.byId("cmd_update_insert").click();
        let issuer = DQ.byId("cmd_update_insert").click();

        this.respond(XmlResponses.UPDATE_INSERT_2);

        expect(DQ.byId("changesArea")
            .html()
            .orElse("fail")
            .value.indexOf("update succeeded 2") != -1)
            .to.be.true;

        let pos1 = (<string>DQ.byId(document.body).html()
            .value).indexOf("insert before succeeded should display before test1");
        let pos3 = (<string>DQ.byId(document.body).html()
            .value).indexOf("insert after succeeded should display after test1");
        let pos2 = (<string>DQ.byId(document.body).html()
            .value).indexOf("update succeeded 2");

        expect(pos1 != -1).to.be.true;

        expect(pos1 < pos2 && pos2 < pos3).to.be.true;

        let pos4 = (<string>DQ.byId(document.body).html()
            .value).indexOf("embedded script at update succeed");

        expect(pos4 != -1).to.be.true;

        done();
    });

    it("must have a full body update", function () {
        DQ.byId("cmd_replace").click();
        this.respond(XmlResponses.BODY_REPLACEMENT);

        //basic replacement
        let newBody = DQ.byId(document.body);
        let newContent = <string>newBody.html().value;

        //standard replacement successful
        expect(newContent.indexOf("<h3>Body replacement test successful</h3>") != -1,
            "elements must be updated").to.be.true;
        //script eval
        expect(newContent.indexOf(">hello from embedded script in replacement body<") != -1,
            "embedded scripts must be executed").to.be.true;

        //body attributes
        expect(newBody.hasClass("tundra"),
            "attributes must be updated").to.be.true;
        expect(newBody.id.value == "the_id",
            "id must be updated").to.be.true;
    });


    it("must have a proper workiung head replace", function () {
        DQ.byId("cmd_replace").click();
        this.respond(XmlResponses.HEAD_REPLACEMENT);

        //basic replacement
        let newHead = DQ.byId(document.head);
        let newBody = DQ.byId(document.body);
        let newContent = <string>newBody.html().value;

        //standard replacement successful
        //script eval
        //modern browsers block head replacement but you still can eval
        expect(newContent.indexOf(">hello from embedded script in replacement head") != -1,
            "embedded scripts must be executed").to.be.true;
    });


    it("must have a proper workiung  root replace", function () {
        DQ.byId("cmd_replace").click();
        this.respond(XmlResponses.VIEW_ROOT_REPLACEMENT);

        //basic replacement
        let newHead = DQ.byId(document.head);
        let newBody = DQ.byId(document.body);
        let newContent = <string>newBody.html().value;

        expect(newHead.isPresent(), " head must exist ").to.be.true;

        //standard replacement successful
        expect(newContent.indexOf("<h3>Body replacement test successful</h3>") != -1,
            "elements must be updated").to.be.true;
        //script eval
        expect(newContent.indexOf(">hello from embedded script in replacement body<") != -1,
            "embedded scripts must be executed").to.be.true;

        //body attributes
        expect(newBody.hasClass("tundra"),
            "attributes must be updated").to.be.true;
        expect(newBody.id.value == "the_id",
            "id must be updated").to.be.true;

        //standard replacement successful
        //script eval
        //modern browsers block head replacement but you still can eval
        expect(newContent.indexOf(">hello from embedded script in replacement head") != -1,
            "embedded scripts must be executed").to.be.true;
    });

    it("must have a viewstate update to be peformed", function () {
        DQ.byId("cmd_viewstate").click();

        this.respond(XmlResponses.VIEWSTATE_1);
        let viewStateElem = DQ.byId('javax.faces.ViewState');
        expect(viewStateElem.inputValue.value == "hello world").to.be.true;
    });

    it("must have processed a proper delete", function () {
        DQ.byId("cmd_delete").click();

        this.respond(XmlResponses.DELETE_1);

        expect(DQ.byId("deletable").isAbsent()).to.be.true;

    });

    it("must have processed a proper eval of a script given in the eval tag", function () {
        let issuer = DQ.byId("cmd_eval").click();

        this.respond(XmlResponses.EVAL_1);

        let resultHTML: string = <string>DQ.byId(document.body).html().value;
        expect(resultHTML.indexOf('eval test succeeded') != -1).to.be.true;

    });

    it("must have updated the viewstates properly", function () {

        let issuer = DQ.byId("cmd_eval").click();

        /*js full submit form, coming from the integration tests*/
        window.document.body.innerHTML = `<form id="j_id__v_0" name="j_id__v_0" method="post" action="/IntegrationJSTest/integrationtestsjasmine/test7-eventtest.jsf"
      enctype="application/x-www-form-urlencoded"><span id="updatePanel">hello world</span><a href="#"
                                                                                              onclick="return jsf.util.chain(this, event,'return false;', 'return myfaces.ab(\'j_id_1l\',\'updateTrigger\');');"
                                                                                              id="updateTrigger"
                                                                                              name="updateTrigger"
                                                                                              class="updateTrigger">[Press
    me for Update]</a><input type="hidden" name="j_id_1l_SUBMIT" value="1">
</form>`;


        jsf.ajax.request(window.document.getElementById("updateTrigger"), null, {
            render: "updatePanel",
            execute: "updatePanel updateTrigger"
        });

        // language=XML
        this.respond(`<?xml version="1.0" encoding="UTF-8"?>
            <partial-response id="j_id__v_0">
                <changes>
                    <update id="updatePanel"><![CDATA[<span id="updatePanel">hello world</span>]]></update>
                    <update id="j_id__v_0:javax.faces.ViewState:1"><![CDATA[RTUyRDI0NzE4QzAxM0E5RDAwMDAwMDVD]]></update>
                </changes>
            </partial-response>`);


        expect(DQ.byId("javax.faces.ViewState").isAbsent()).to.be.false;

        expect((<HTMLInputElement>document.getElementById("javax.faces.ViewState")).value == "RTUyRDI0NzE4QzAxM0E5RDAwMDAwMDVD").to.be.true;
        expect(DQ.byId("javax.faces.ViewState").inputValue.value == "RTUyRDI0NzE4QzAxM0E5RDAwMDAwMDVD").to.be.true;
    });


    it("must have updated the viewstates properly with lenient update block", function () {

        let issuer = DQ.byId("cmd_eval").click();

        /*js full submit form, coming from the integration tests*/
        window.document.body.innerHTML = `<form id="j_id__v_0" name="j_id__v_0" method="post" action="/IntegrationJSTest/integrationtestsjasmine/test7-eventtest.jsf"
      enctype="application/x-www-form-urlencoded"><span id="updatePanel">hello world</span><a href="#"
                                                                                              onclick="return jsf.util.chain(this, event,'return false;', 'return myfaces.ab(\'j_id_1l\',\'updateTrigger\');');"
                                                                                              id="updateTrigger"
                                                                                              name="updateTrigger"
                                                                                              class="updateTrigger">[Press
    me for Update]</a><input type="hidden" name="j_id_1l_SUBMIT" value="1">
</form>`;


        jsf.ajax.request(window.document.getElementById("updateTrigger"), null, {
            render: "updatePanel",
            execute: "updatePanel updateTrigger"
        });

        // language=XML
        this.respond(`<?xml version="1.0" encoding="UTF-8"?>
            <partial-response id="j_id__v_0">
                <changes>
                    <update id="updatePanel"><![CDATA[<span id="updatePanel">hello world</span>]]></update>
                    <update id="j_id__v_0:javax.faces.ViewState:1"><![CDATA[RTUyRDI0NzE4QzAxM0E5RDAwMDAwMDVD]]><!-- 
                        Some random junk which is sent by the server
                    --></update>
                </changes>
            </partial-response>`);


        expect(DQ.byId("javax.faces.ViewState").isAbsent()).to.be.false;

        expect((<HTMLInputElement>document.getElementById("javax.faces.ViewState")).value == "RTUyRDI0NzE4QzAxM0E5RDAwMDAwMDVD").to.be.true;
        expect(DQ.byId("javax.faces.ViewState").inputValue.value == "RTUyRDI0NzE4QzAxM0E5RDAwMDAwMDVD").to.be.true;
    });


    //TODO update head all and redirect
});