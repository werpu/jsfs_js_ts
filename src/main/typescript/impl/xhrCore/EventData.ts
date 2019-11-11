import {Const} from "../core/Const";
import {ExtLang} from "../util/Lang";
import {IConfig} from "../../ext/monadish/Types";
import getMessage = ExtLang.getMessage;
import EVENT = Const.EVENT;
import P_PARTIAL_SOURCE = Const.P_PARTIAL_SOURCE;
import BEGIN = Const.BEGIN;

export class EventData {
    type: string;
    status: string;
    source: string;
    responseCode: string;
    responseText: string;
    responseXML: Document;

    static createFromRequest(request: XMLHttpRequest, context: IConfig, /*event name*/ name: string): EventData {

        let eventData = new EventData();
        let UNKNOWN = getMessage("UNKNOWN");

        eventData.type = EVENT;
        eventData.status = name;
        eventData.source = context.getIf(P_PARTIAL_SOURCE).value;

        if (name !== BEGIN) {
            eventData.responseCode = request?.status?.toString();
            eventData.responseText = request?.responseText;
            eventData.responseXML = request?.responseXML;
        }
        return eventData;
    }
}
