import {Config, DomQuery, XMLQuery} from "../../_ext/monadish";
import {Const} from "../core/Const";
import {Implementation} from "../Impl";
import {Assertions} from "../util/Assertions";
import {Lang} from "../util/Lang";
import {ResonseDataResolver} from "./ResonseDataResolver";

/**
 * Response processor
 *
 * Each  XML tag is either a node or a leaf
 * or both
 *
 * the progcessor provides a set of operations
 * which are executed on a single leafe node
 * and present the core functionality of our response
 *
 */
export class ResponseProcessor {

    static replaceHead(context: Config, internalContext: Config, shadowHead: XMLQuery) {
        let shadowHTML = <DomQuery>DomQuery.fromMarkup("<head />").html(shadowHead.getIf("*").toString());
        let oldHead = DomQuery.querySelectorAll(Const.TAG_HEAD);

        oldHead.querySelectorAll(Const.SEL_SCRIPTS_STYLES).delete();
        shadowHTML.runCss();
        shadowHTML.runScripts();
    }

    static replaceBody(context: Config, internalContext: Config, shadowBody: XMLQuery) {
        let shadowInnerHTML = shadowBody.getIf("*").toString();

        let resultb = <DomQuery>DomQuery.querySelectorAll(Const.TAG_BODY).html(shadowInnerHTML);
        let sourceFormb = resultb.querySelectorAll(Const.TAG_FORM);

        internalContext.apply(Const.UPDATE_FORMS).value.push(sourceFormb);
        internalContext.apply(Const.UPDATE_ELEMS).value.push(resultb);

        resultb.copyAttrs(shadowBody);
    }

    /**
     * Leaf Tag eval... process whatever is in the evals cdata block
     *
     * @param node
     */
    static processEvalTag(node: XMLQuery) {
        DomQuery.globalEval(node.cDATAAsString);
    }


    /**
     * processes an incoming error from the response
     * which is hosted under the &lt;error&gt; tag
     * @param request the current request
     * @param context the contect object
     * @param node the node in the xml hosting the error message
     */
    static processError(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        /**
         * <error>
         *      <error-name>String</error-name>
         *      <error-message><![CDATA[message]]></error-message>
         * <error>
         */

        let errorName = node.getIf("error-name").textContent("");
        let errorMessage = node.getIf("error-message").cDATAAsString;

        let errorData = Implementation.instance.createErrorData(request, context, Const.SERVER_ERROR, errorName, errorMessage, "Response", "processError");
        Implementation.instance.sendError(errorData);
    }

    /**
     * process the redirect operation
     *
     * @param request
     * @param context
     * @param internalContext
     * @param node
     */
    static processRedirect(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        Assertions.assertUrlExists(node);

        let redirectUrl = Lang.instance.trim(node.attr(Const.ATTR_URL).value);
        if (redirectUrl != "") {
            (<any>window).location.href = redirectUrl;
        }
    }

    /**
     * processes the update operation and updates the node with the cdata block
     * @param context
     * @param internalContext
     * @param node
     * @param cdataBlock
     */
    static processUpdateElem(context: Config, internalContext: Config, node: XMLQuery, cdataBlock: string) {
        let result = DomQuery.byId(node.attr("id").value).outerHTML(cdataBlock);
        let sourceForm = result.parents(Const.TAG_FORM).orElse(result.byTagName(Const.TAG_FORM, true));

        internalContext.apply(Const.UPDATE_FORMS).value.push(sourceForm);
        internalContext.apply(Const.UPDATE_ELEMS).value.push(result);
    }


    static processDeleteTag(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        DomQuery.byId(node.id.value).delete();
    }


    /**
     * attributes leaf tag... process the attributes
     *
     * @param request
     * @param context
     * @param internalContext
     * @param node
     */
    static processAttributes(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        let elem = DomQuery.byId(node.id.value);

        node.byTagName("attribute").each((item: XMLQuery) => {
            elem.attr(item.attr("name").value).value = item.attr("value").value;
        });
    }

    static replaceViewRoot(context: Config, internalContext: Config, shadownResponse: XMLQuery) {

        let head = new XMLQuery(shadownResponse.byTagName(Const.TAG_HEAD));
        let body = new XMLQuery(shadownResponse.byTagName(Const.TAG_BODY));

        if (head.isPresent()) {
            this.replaceHead(context, internalContext, head);
        }
        if (body.isPresent()) {
            this.replaceBody(context, internalContext, body);
        }
    }

    static processInsert(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        //let insertId = node.id; //not used atm

        let before = node.attr(Const.TAG_BEFORE);
        let after = node.attr(Const.TAG_AFTER);

        let insertNodes = DomQuery.fromMarkup(node.cDATAAsString);

        if (before.isPresent()) {
            DomQuery.byId(before.value).insertBefore(insertNodes);
        }
        if (after.isPresent()) {
            DomQuery.byId(after.value).insertAfter(insertNodes);
        }

        internalContext.apply(Const.UPDATE_ELEMS).value.push(insertNodes);
    }

    /**
     * process the viewState update, update the affected
     * forms with their respective new viewstate values
     *
     */
    static processViewState(context: Config, internalContext: Config, node: XMLQuery) {
        internalContext.apply("appliedViewState").value = node.textContent("");

        let elem = ResonseDataResolver.resolveSourceElement(context, internalContext);
        let sourceForm = ResonseDataResolver.resolveSourceForm(internalContext, elem);

        if (sourceForm.isPresent()) {
            internalContext.apply(Const.UPDATE_FORMS).value.push(sourceForm);
        }
        //no source form found is not an error because
        //we might be able to recover one way or the other
        //TODO issue a warning for the no source form case
    }


    static globalEval(context: Config, internalContext: Config) {
        let updateElems = new DomQuery(internalContext.getIf(Const.UPDATE_ELEMS).value);
        updateElems.runCss();
        updateElems.runScripts();
    }

    static fixViewStates(context: Config, internalContext: Config) {
        if (internalContext.getIf("appliedViewState").isAbsent()) {
            return;
        }
        let viewState = internalContext.getIf("appliedViewState").value;
        if (this.isAllFormResolution(context)) {
            let forms = DomQuery.querySelectorAll(Const.TAG_FORM);
            this.appendViewStateToForms(forms, viewState);
        } else {
            let updateForms = new DomQuery(internalContext.getIf(Const.UPDATE_FORMS).value);
            this.appendViewStateToForms(updateForms, viewState);
        }
    }

    private static isAllFormResolution(context: Config) {
        return Lang.instance.getLocalOrGlobalConfig(context, "no_portlet_env", false);
    }

    private static appendViewStateToForms(forms: DomQuery, viewState: string) {
        forms.each((form: DomQuery) => {
            let viewStateElems = form.querySelectorAll(Const.SEL_VIEWSTATE_ELEM)
                .orElseLazy(() => this.newViewStateElement(form));

            viewStateElems.attr("value").value = viewState;
        });
    }

    /**
     * Helper to Create a new JSF ViewState Element
     *
     * @param parent, the parent node to attach the viewstate element to
     * (usually a form node)
     */
    private static newViewStateElement(parent: DomQuery): DomQuery {
        let newViewState = DomQuery.fromMarkup(
            ["<input type='hidden'", "id='", Const.P_VIEWSTATE, "' name='", Const.P_VIEWSTATE, "' value='' />"].join("")
        );
        newViewState.appendTo(parent);
        return newViewState;
    }
}