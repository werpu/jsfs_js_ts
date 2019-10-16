export class Const {
    /*internal identifiers for options*/
    static IDENT_ALL = "@all";
    static IDENT_NONE = "@none";
    static IDENT_THIS = "@this";
    static IDENT_FORM = "@form";

    /*
     * [STATIC] constants
     */

    static P_PARTIAL_SOURCE = "javax.faces.source";
    static PARTIAL_ID = "partialId";
    static P_VIEWSTATE = "javax.faces.ViewState";
    static P_VIEWROOT = "javax.faces.ViewRoot";
    static P_VIEWHEAD = "javax.faces.ViewHead";
    static P_VIEWBODY = "javax.faces.ViewBody";


    static P_CLIENTWINDOW = "javax.faces.ClientWindow";
    static P_AJAX = "javax.faces.partial.ajax";
    static P_EXECUTE = "javax.faces.partial.execute";
    static P_RENDER = "javax.faces.partial.render";
    static P_EVT = "javax.faces.partial.event";
    static P_CLIENT_WINDOW = "javax.faces.ClientWindow";
    static P_RESET_VALUES = "javax.faces.partial.resetValues";
    static P_WIN_ID = "javax.faces.WindowId";

    static P_WINDOW_ID = "javax.faces.windowId";

    /* message types */
    static ERROR = "error";
    static EVENT = "event";

    static ON_ERROR = "onerror";
    static ON_EVENT = "onevent";

    /* event emitting stages */
    static BEGIN = "begin";
    static COMPLETE = "complete";
    static SUCCESS = "success";

    static SOURCE = "source";
    static STATUS = "status";
    static RESPONSE_TEXT = "responseText";
    static RESPONSE_XML = "responseXML";

    /*ajax errors spec 14.4.2*/
    static HTTPERROR = "httpError";
    static EMPTY_RESPONSE = "emptyResponse";
    static MALFORMEDXML = "malformedXML";
    static SERVER_ERROR = "serverError";
    static CLIENT_ERROR = "clientError";
    static TIMEOUT_EVENT = "timeout";

    static CTX_PARAM_MF_INTERNAL = "_mfInternal";

    static CTX_PARAM_SRC_FRM_ID = "_mfSourceFormId";
    static CTX_PARAM_SRC_CTL_ID = "_mfSourceControlId";
    static CTX_PARAM_TR_TYPE = "_mfTransportType";
    static CTX_PARAM_PASS_THR = "passThrgh";
    static CTX_PARAM_DELAY = "delay";
    static CTX_PARAM_TIMEOUT = "timeout";
    static CTX_PARAM_RST = "resetValues";
    static CTX_PARAM_EXECUTE = "execute";

    static STAGE_DEVELOPMENT = "Development";



    static CONTENT_TYPE: "Content-Type";
    static HEAD_FACES_REQ: "Faces-Request";
    static REQ_ACCEPT = "Accept";
    static VAL_AJAX: "partial/ajax";
    static ENCODED_URL: "javax.faces.encodedURL";
    static REQ_TYPE_GET = "GET";
    static REQ_TYPE_POST = "POST";
    static STATE_EVT_BEGIN = "begin"; //TODO remove this
    static STATE_EVT_TIMEOUT = "TIMEOUT_EVENT";
    static STATE_EVT_COMPLETE = "complete"; //TODO remove this
    static URL_ENCODED = "application/x-www-form-urlencoded";
    static NO_TIMEOUT = 0;
    static STD_ACCEPT = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";

    static TAG_HEAD = "head";
    static TAG_FORM = "form";
    static TAG_BODY = "body";
    static TAG_BEFORE = "before";
    static TAG_AFTER = "after";


    static SEL_VIEWSTATE_ELEM = "[name='" + Const.P_VIEWSTATE + "']";
    static SEL_RESPONSE_XML = "responseXML";

    static PHASE_PROCESS_RESPONSE = "processResponse";


    static ERR_NO_PARTIAL_RESPONSE = "Partial response not set";
}