import {Config} from "../../ext/monadish";
import {Const} from "../core/Const";
import {ExtLang} from "../util/Lang";
import getMessage = ExtLang.getMessage;

export class EventData {
    type: string;
    status: string;
    source: string;
    responseCode: string;
    responseText: string;
    responseXML: Document;

    static createFromRequest(request: XMLHttpRequest, context: Config, /*event name*/ name: string): EventData {

        let eventData = new EventData();
        let UNKNOWN = getMessage("UNKNOWN");

        eventData.type = Const.EVENT;
        eventData.status = name;
        eventData.source = context.getIf(Const.P_PARTIAL_SOURCE).value;

        if (name !== Const.BEGIN) {
            eventData.responseCode = request?.status?.toString();
            eventData.responseText = request?.responseText;
            eventData.responseXML = request?.responseXML;
        }
        return eventData;
    }
}
