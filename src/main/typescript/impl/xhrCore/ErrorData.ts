import {Const} from "../core/Const";
import {Config} from "../../ext/monadish";
import {Lang} from "../util/Lang";
import {EventData} from "./EventData";


export enum ErrorType {
    SERVER_ERROR = "serverError",
    HTTP_ERROR = "httpError",
    CLIENT_ERROR = "clientErrror",
    TIMEOUT = "timeout"
}

/**
 * the spec has a problem of having the error
 * object somewhat underspecified, there is no clear
 * description of the required contents.
 * I want to streamline it with mojarra here
 * hence we are going to move
 * everything into the same attributes,
 * I will add deprecated myfaces backwards compatibility attributes as well
 */
export class ErrorData extends EventData {

    type: string = "error";
    source: string;
    errorName: string;
    errorMessage: string;

    responseText: string;
    responseXML: any;

    status: string;
    typeDetails: ErrorType;

    //TODO backwards compatible attributes
    serverErrorName: string;
    serverErrorMessage: string;
    message: string;

    constructor(source: string, errorName: string, errorMessage: string, responseText: string = null, responseXML: any = null, responseCode: string = "200", status: string = "UNKNOWN", type = ErrorType.CLIENT_ERROR) {
        super();
        this.source = source;
        this.type = "error";
        this.errorName = errorName;
        this.message = this.errorMessage = errorMessage;
        this.responseCode = responseCode;
        this.responseText = responseText;
        this.status = status;
        this.typeDetails = type;

        if (type == ErrorType.SERVER_ERROR) {
            this.serverErrorName = this.errorName;
            this.serverErrorMessage = this.errorMessage;
        }
    }

    static fromClient(e: Error): ErrorData {
        return new ErrorData("client", e.name, e.message, e.stack);
    }

    static fromHttpConnection(source: string, name: string, message: string, responseText, responseCode: number): ErrorData {
        return new ErrorData(source, name, message, responseText, responseCode, null, "UNKNOWN", ErrorType.HTTP_ERROR);
    }

    static fromGeneric(context: Config, errorCode: number, errorType: String): ErrorData {

        let UNKNOWN = "UNKNOWN";
        let getMsg = this.getMsg;

        let source =  getMsg(context,Const.SOURCE);
        let errorName =  getMsg(context,Const.ERROR_NAME);
        let errorMessage =  getMsg(context, Const.ERROR_MESSAGE);
        let status =  getMsg(context,Const.STATUS);
        let responseText =  getMsg(context,Const.RESPONSE_TEXT);
        let responseXML =  getMsg(context,Const.RESPONSE_XML);
        return new ErrorData(source, name, errorMessage, responseText, responseXML, errorCode+"", status, ErrorType.SERVER_ERROR);
    }

    private static getMsg(context, param) {
        let UNKNOWN = "UNKNOWN";
        let getMsg = Lang.instance.getMessage;
        return getMsg(context.getIf(param).orElse(UNKNOWN).value);
    }

    static fromServerError(context: Config): ErrorData {
        return this.fromGeneric(context, -1, ErrorType.SERVER_ERROR);
    }

}