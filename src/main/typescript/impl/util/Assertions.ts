import {Config, XMLQuery} from "../../ext/monadish";
import {Const} from "../core/Const";
import {Implementation} from "../AjaxImpl";
import {Lang} from "../util/Lang";
import {DQ} from "../../ext/monadish/DomQuery";

/**
 * a set of internal code assertions
 * which raise an error
 *
 */
export class Assertions {

    static assertRequestIntegrity(options: Config, elem: DQ) {
        /*assert if the onerror is set and once if it is set it must be of type function*/
        Assertions.assertType(options.getIf(Const.ON_ERROR).value, "function");
        /*assert if the onevent is set and once if it is set it must be of type function*/
        Assertions.assertType(options.getIf(Const.ON_EVENT).value, "function");
        //improve the error messages if an empty elem is passed
        Assertions.assertElementExists(elem);
    }

    static assertUrlExists(node: XMLQuery): void {
        if (node.attr(Const.ATTR_URL).isAbsent()) {
            throw Assertions.raiseError(new Error(), Lang.instance.getMessage("ERR_RED_URL", null, "_Ajaxthis.processRedirect"), "processRedirect");
        }
    }

    static assertElementExists(elem: DQ) {
        if (elem.isAbsent()) {
            throw Lang.instance.makeException(new Error(), "ArgNotSet", null, "Impl", "request", Lang.instance.getMessage("ERR_MUST_BE_PROVIDED1", "{0}: source  must be provided", "jsf.ajax.request", "source element id"));
        }
    }

    static assertType(value: any,type: string) {
        Lang.instance.assertType(value, type);
    }

    /**
     * checks the xml for various issues which can occur
     * and prevent a proper processing
     */
    static assertValidXMLResponse(responseXML: XMLQuery) {
        if (responseXML.isAbsent()) {
            this.raiseError(new Error(),
                Const.EMPTY_RESPONSE, Const.EMPTY_RESPONSE,
                "Response", Const.PHASE_PROCESS_RESPONSE);
        }
        if (responseXML.isXMLParserError()) {
            throw this.raiseError(new Error(), responseXML.parserErrorText(""), Const.PHASE_PROCESS_RESPONSE);
        }
        responseXML.querySelectorAll(Const.RESP_PARTIAL).orElseLazy(() => {
            throw this.raiseError(new Error(), Const.ERR_NO_PARTIAL_RESPONSE, Const.PHASE_PROCESS_RESPONSE);
        });
    }

    /**
     * internal helper which raises an error in the
     * format we need for further processing
     *
     * @param message the message
     * @param title the title of the error (optional)
     * @param name the name of the error (optional)
     */
    static raiseError(error: any, message: string, caller ?: string, title ?: string, name ?: string) {
        let _Impl = Implementation.instance;
        let finalTitle = title ?? Const.MALFORMEDXML;
        let finalName = name ?? Const.MALFORMEDXML;
        let finalMessage = message ?? "";


        return Lang.instance.makeException(error, finalTitle, finalName, "Response", caller || (((<any>arguments).caller) ? (<any>arguments).caller.toString() : "_raiseError"), finalMessage);
    }


}