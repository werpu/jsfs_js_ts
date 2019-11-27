import {Config, Lang, XMLQuery} from "../../ext/monadish";
import {Const} from "../core/Const";

import {DQ} from "../../ext/monadish/DomQuery";
import {ExtLang} from "./Lang";
import getMessage = ExtLang.getMessage;
import makeException = ExtLang.makeException;

/**
 * a set of internal code assertions
 * which raise an error
 *
 */
export module Assertions {

    export function assertRequestIntegrity(options: Config, elem: DQ): void | never {
        /*assert if the onerror is set and once if it is set it must be of type function*/
        assertFunction(options.getIf(Const.ON_ERROR).value);
        /*assert if the onevent is set and once if it is set it must be of type function*/
        assertFunction(options.getIf(Const.ON_EVENT).value);
        //improve the error messages if an empty elem is passed
        //Assertions.assertElementExists(elem);
        assert(elem.isPresent(), getMessage("ERR_MUST_BE_PROVIDED1", "{0}: source  must be provided or exist", "source element id"), "jsf.ajax.request", "ArgNotSet",  )
    }

    export function assertUrlExists(node: XMLQuery): void | never {
        if (node.attr(Const.ATTR_URL).isAbsent()) {
            throw Assertions.raiseError(new Error(), getMessage("ERR_RED_URL", null, "_Ajaxthis.processRedirect"), "processRedirect");
        }
    }

    /**
     * checks the xml for various issues which can occur
     * and prevent a proper processing
     */
    export function assertValidXMLResponse(responseXML: XMLQuery) : void | never  {
        assert(!responseXML.isAbsent(), Const.EMPTY_RESPONSE, Const.PHASE_PROCESS_RESPONSE);
        assert(!responseXML.isXMLParserError(),  responseXML.parserErrorText(Const.EMPTY_STR), Const.PHASE_PROCESS_RESPONSE);
        assert(responseXML.querySelectorAll(Const.RESP_PARTIAL).isPresent(), Const.ERR_NO_PARTIAL_RESPONSE, Const.PHASE_PROCESS_RESPONSE);
    }

    /**
     * internal helper which raises an error in the
     * format we need for further processing
     *
     * @param message the message
     * @param title the title of the error (optional)
     * @param name the name of the error (optional)
     */
    export function raiseError(error: any, message: string, caller ?: string, title ?: string, name ?: string): Error {

        let finalTitle = title ?? Const.MALFORMEDXML;
        let finalName = name ?? Const.MALFORMEDXML;
        let finalMessage = message ?? Const.EMPTY_STR;

        //TODO clean up the messy makeException, this is a perfect case for encapsulation and sane defaults
        return makeException(error, finalTitle, finalName, "Response", caller || (((<any>arguments).caller) ? (<any>arguments).caller.toString() : "_raiseError"), finalMessage);
    }

    /*
     * using the new typescript 3.7 compiler assertion functionality to improve compiler hinting
     * we are not fully there yet, but soon
     */

    export function assert(value: any, msg = Const.EMPTY_STR, caller=Const.EMPTY_STR, title="Assertion Error"): asserts value {
        if(!value) {
            throw Assertions.raiseError(new Error(), msg ,caller, title);
        }
    }


    export function assertType(value: any, theType: any, msg = Const.EMPTY_STR, caller=Const.EMPTY_STR, title="Type Assertion Error"): asserts value {
        if((!!value) && !Lang.assertType(value,theType)) {
            throw Assertions.raiseError(new Error(), msg ,caller, title);
        }
    }

    export function assertFunction(value: any, msg = Const.EMPTY_STR, caller=Const.EMPTY_STR, title="Assertion Error"): asserts value is Function {
        assertType(value, "function", msg, caller, title);
    }
}


