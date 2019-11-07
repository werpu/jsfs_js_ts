import {describe} from "mocha";
import * as sinon from "sinon";
import {StandardInits} from "../frameworkBase/_ext/shared/StandardInits";
import {Implementation} from "../../../main/typescript/impl/AjaxImpl";

import {expect} from "chai";
import protocolPage = StandardInits.protocolPage;
import {DQ} from "../../../main/typescript/ext/monadish/DomQuery";
import {XmlResponses} from "../frameworkBase/_ext/shared/XmlResponses";

declare var jsf: any;

describe('Tests the jsf websocket client side api on high level (generic test without any myfaces dependencies', function () {
    it("must register a channel", function () {
        /**
         *   export function init(socketClientId: string,
         uri: string,
         channel: string,
         onopen: Function,
         onmessage: Function,
         onclose: Function,
         behaviorScripts: any,
         autoconnect: boolean) {
            PushImpl.init(socketClientId, uri, channel, onopen, onmessage, onclose, behaviorScripts, autoconnect);
        }
         */


        /*jsf.push.init("clientId1", "booga.ws", () => {
                //todo do something in opnopen
            },
            () => {
                //todo do something in onclose
            },
            () => {
                //todo do something in onmessage
            },
            "",
            true
        )*/
    })
});