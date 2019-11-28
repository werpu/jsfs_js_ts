import {Config, DQ} from "../../ext/monadish";
import {BEGIN, CTX_PARAM_PASS_THR, EVENT, P_PARTIAL_SOURCE, SOURCE} from "../core/Const";
import {ExtLang} from "../util/Lang";
import getMessage = ExtLang.getMessage;


export class EventData {
    type: string;
    status: string;
    source: any;
    responseCode: string;
    responseText: string;
    responseXML: Document;

    static createFromRequest(request: XMLHttpRequest, context: Config, /*event name*/ name: string): EventData {

        let eventData = new EventData();
        let UNKNOWN = getMessage("UNKNOWN");

        eventData.type = EVENT;
        eventData.status = name;

        let sourceId: string = context.getIf(SOURCE)
            .orElse(context.getIf(P_PARTIAL_SOURCE).value)
            .orElse(context.getIf(CTX_PARAM_PASS_THR, P_PARTIAL_SOURCE).value).value;
        if(sourceId) {
            eventData.source = DQ.byId(sourceId).first().value.value;
        }


        if (name !== BEGIN) {
            eventData.responseCode = request?.status?.toString();
            eventData.responseText = request?.responseText;
            eventData.responseXML = request?.responseXML;
        }
        return eventData;
    }
}
