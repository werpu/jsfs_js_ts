import {Config, DQ} from "mona-dish";
import {BEGIN, CTX_PARAM_PASS_THR, EVENT, P_PARTIAL_SOURCE, SOURCE} from "../core/Const";

export class EventData {
    type: string;
    status: string;
    source: any;
    responseCode: string;
    responseText: string;
    responseXML: Document;

    static createFromRequest(request: XMLHttpRequest, context: Config, /*event name*/ name: string): EventData {

        let eventData = new EventData();

        eventData.type = EVENT;
        eventData.status = name;

        let sourceId: string = context.getIf(SOURCE)
            .orElseLazy(() => context.getIf(P_PARTIAL_SOURCE).value)
            .orElseLazy(() => context.getIf(CTX_PARAM_PASS_THR, P_PARTIAL_SOURCE).value).value;
        if (sourceId) {
            eventData.source = DQ.byId(sourceId, true).first().value.value;
        }

        if (name !== BEGIN) {
            eventData.responseCode = request?.status?.toString();
            eventData.responseText = request?.responseText;
            eventData.responseXML = request?.responseXML;
        }
        return eventData;
    }
}
