import {StandardInits} from "../frameworkBase/_ext/shared/StandardInits";
import * as sinon from "sinon";
import {Implementation} from "../../impl/AjaxImpl";
import {expect} from "chai";
import protocolPage = StandardInits.protocolPage;

const jsdom = require("jsdom");
const {JSDOM} = jsdom;


describe("Should trigger the progress on xhr request", function () {
    beforeEach(async function () {
        let waitForResult = protocolPage();

        //build up the test fixture
        return waitForResult.then((close) => {
            //we generate an xhr mock class replacement
            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];

            //we store the requests to have access to them later
            this.xhr.onCreate = (xhr) => {
                this.requests.push(xhr);
            };
            //we anchchor the mock into the fake dom
            (<any>global).XMLHttpRequest = this.xhr;
            window.XMLHttpRequest = this.xhr;

            //general cleanup of overloaded resources
            this.closeIt = () => {
                (<any>global).XMLHttpRequest = window.XMLHttpRequest = this.xhr.restore();
                Implementation.reset();
                close();
            };
        });
    });
    afterEach(function () {
        this.closeIt();
    });

    it("must trigger progress on xhr request", function() {
        let caughtProgressEvents = [];
        faces.ajax.request(document.getElementById("cmd_eval"), null,
            {
                render: '@form',
                execute: '@form',
                myfaces: {
                    upload: {
                        onProgress: (upload: XMLHttpRequestUpload, event: ProgressEvent) => {
                            caughtProgressEvents.push(event);
                        }
                    }
                }
            });

        let progressEvent = new ProgressEvent("progress");
        let progressEvent2 =  new ProgressEvent("progress");
        let xhr = this.requests.shift();
        xhr.upload.dispatchEvent(progressEvent);
        xhr.upload.dispatchEvent(progressEvent2);
        expect(caughtProgressEvents.length).to.eq(2);
        expect(caughtProgressEvents[0] === progressEvent).to.eq(true);
        expect(caughtProgressEvents[1] === progressEvent2).to.eq(true);
    });
});