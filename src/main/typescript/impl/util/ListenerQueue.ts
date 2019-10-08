import {Queue} from "./Queue";

export class EventData {
    type: string;
    status: string;
    source: string;
    responseCode: string;
    responseText: string;
    responseXML: string;
}

export class ErrorData extends EventData {
    serverErrorName: string;
    serverErrorMessage: string;
}


export interface IListener<T> {
    (data: T): void;
}


export class ListenerQueue<T> extends Queue<IListener<T>> {

    /**
     * generic broadcast with a number of arguments being passed down
     * @param {Object} argument the arguments passed down which are broadcast
     */
    broadcastEvent(...theArgs: Array<T>) {
        this.each((element: IListener<T>) => {
            element.apply(null, theArgs)
        });
    }
}