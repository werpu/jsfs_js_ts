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

        let source =  Lang.instance.getMessage(context.getIf(Const.SOURCE).orElse(UNKNOWN).value);
        let errorName =  Lang.instance.getMessage(context.getIf(Const.ERROR_NAME).orElse(UNKNOWN).value);
        let errorMessage =  Lang.instance.getMessage(context.getIf(Const.ERROR_MESSAGE).orElse(UNKNOWN).value);
        let status =  Lang.instance.getMessage(context.getIf(Const.STATUS).orElse(UNKNOWN).value);
        let responseText =  Lang.instance.getMessage(context.getIf(Const.RESPONSE_TEXT).orElse(UNKNOWN).value);
        let responseXML =  Lang.instance.getMessage(context.getIf(Const.RESPONSE_XML).orElse(UNKNOWN).value);
        return new ErrorData(source, name, errorMessage, responseText, responseXML, errorCode+"", status, ErrorType.SERVER_ERROR);
    }

    static fromServerError(context: Config): ErrorData {
        return this.fromGeneric(context, -1, ErrorType.SERVER_ERROR);
    }

}