import * as sinon from "sinon";
import {Implementation} from "../../../main/typescript/impl/AjaxImpl";
import {StandardInits} from "../frameworkBase/_ext/shared/StandardInits";
import defaultMyFaces = StandardInits.defaultMyFaces;
import protocolPage = StandardInits.protocolPage;
import {DQ} from "../../../main/typescript/ext/monadish/DomQuery";
import {XhrFormData} from "../../../main/typescript/impl/xhrCore/XhrFormData";
import { expect } from "chai";

describe("test for proper request param patterns identical to the old implementation", function () {
    const DELETE_PATTERN = {
        op: "delete1",
        "javax.faces.source": "cmd_delete",
        "javax.faces.partial.execute": "cmd_delete",
        "form1": "form1",
        "javax.faces.ViewState": "blubbblubblubb"
    }

    const UPDATE_INSERT_2 = {
        "op": "updateinsert2",
        "javax.faces.partial.event": "message",
        "javax.faces.source": "cmd_update_insert2",
        "javax.faces.partial.ajax": "true",
        "javax.faces.partial.execute": "cmd_update_insert2",
        "form1": "form1",
        "javax.faces.ViewState": "blubbblubblubb"
    }

    const ERRORS = {
        "op": "errors",
        "javax.faces.partial.event": "message",
        "javax.faces.source": "cmd_error",
        "javax.faces.partial.ajax": "true",
        "javax.faces.partial.execute": "cmd_error",
        "form1": "form1",
        "javax.faces.ViewState": "blubbblubblubb"
    }

    /**
     * matches two maps for absolute identicality
     */
    let matches = (item1: {[key: string]: any}, item2: {[key: string]: any}): boolean => {
        if(Object.keys(item1).length != Object.keys(item2).length) {
            return false;
        }
        for(let key in item1) {
            if((!(key in item2)) || item1[key] != item2[key]) {
                return false;
            }
        }
        return true;
    }


    beforeEach(async function () {

        let waitForResult = protocolPage();

        return waitForResult.then((close) => {

            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = (xhr) => {
                this.requests.push(xhr);
            };
            (<any>global).XMLHttpRequest = this.xhr;
            (<any>window).XMLHttpRequest = this.xhr;

            this.jsfAjaxResponse = sinon.stub((<any>global).jsf.ajax, "response");

            this.closeIt = () => {
                (<any>global).XMLHttpRequest = (<any>window).XMLHttpRequest = this.xhr.restore();
                this.jsfAjaxResponse.restore();
                Implementation.reset();
                close();
            }
        });
    });

    afterEach(function () {
        this.closeIt();
    });

    it("must pass updateinsert2 with proper parameters", function() {
        DQ.byId("cmd_update_insert2").click();

        let requestBody = this.requests[0].requestBody;
        let formData = new XhrFormData(requestBody)

        expect(matches(formData.value, UPDATE_INSERT_2)).to.be.true;

    })


});