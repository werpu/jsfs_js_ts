/**
 * api interfaces used by the jsf.js api
 */
module _apiInterfaces {
    "use strict";

    /**
     *  * <ul>
     *     <li> errorData.type : &quot;error&quot;</li>
     *     <li> errorData.status : the error status message</li>
     *     <li> errorData.serverErrorName : the server error name in case of a server error</li>
     *     <li> errorData.serverErrorMessage : the server error message in case of a server error</li>
     *     <li> errorData.source  : the issuing source element which triggered the requestInternal </li>
     *     <li> eventData.responseCode: the response code (aka http requestInternal response code, 401 etc...) </li>
     *     <li> eventData.responseText: the requestInternal response text </li>
     *     <li> eventData.responseXML: the requestInternal response xml </li>
     * </ul>
     */
    export interface ErrorData {
        type: any;
        status : string;
        serverErrorName: string;
        serverErrorMessage: string;
        source: any;

        responseCode: number;
        responseText: string;
        responseXML: string;
    }

    /**
     * <ul>
     *     <li>status: status of the ajax cycle</li>
     * </ul>
     */
    export interface EventData {
        status: String;
        source: any;
    }

}