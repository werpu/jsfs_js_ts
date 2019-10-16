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

    constructor(private request: Config, private externalContext: Config, private internalContext: Config) {

    }

    replaceHead(shadowHead: XMLQuery) {
        let shadowHTML = <DomQuery>DomQuery.fromMarkup("<head />").html(shadowHead.getIf("*").toString());
        let oldHead = DomQuery.querySelectorAll(Const.TAG_HEAD);

        oldHead.querySelectorAll(Const.SEL_SCRIPTS_STYLES).delete();
        shadowHTML.runCss();
        shadowHTML.runScripts();
    }

    replaceBody(shadowBody: XMLQuery) {
        let shadowInnerHTML = shadowBody.getIf("*").toString();

        let resultingBody = <DomQuery>DomQuery.querySelectorAll(Const.TAG_BODY).html(shadowInnerHTML);
        let updateForms = resultingBody.querySelectorAll(Const.TAG_FORM);

        this.storeForLaterProcessing(updateForms, resultingBody);

        resultingBody.copyAttrs(shadowBody);
    }

    private storeForLaterProcessing(updateForms, resultingBody) {
        this.internalContext.apply(Const.UPDATE_FORMS).value.push(updateForms);
        this.internalContext.apply(Const.UPDATE_ELEMS).value.push(resultingBody);
    }

    /**
     * Leaf Tag eval... process whatever is in the evals cdata block
     *
     * @param node
     */
    processEvalTag(node: XMLQuery) {
        DomQuery.globalEval(node.cDATAAsString);
    }

    /**
     * processes an incoming error from the response
     * which is hosted under the &lt;error&gt; tag
     * @param request the current request
     * @param context the contect object
     * @param node the node in the xml hosting the error message
     */
    processError( node: XMLQuery) {
        /**
         * <error>
         *      <error-name>String</error-name>
         *      <error-message><![CDATA[message]]></error-message>
         * <error>
         */

        const errorName = node.getIf("error-name").textContent("");
        const errorMessage = node.getIf("error-message").cDATAAsString;

        const Impl = Implementation.instance;
        const errorData = Impl.createErrorData(this.request.value, this.externalContext,
            Const.SERVER_ERROR, errorName, errorMessage, "Response", "processError");
        Impl.sendError(errorData);
    }

    /**
     * process the redirect operation
     *
     * @param request
     * @param context
     * @param internalContext
     * @param node
     */
    processRedirect( node: XMLQuery) {
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
    processUpdateElem(node: XMLQuery, cdataBlock: string) {
        let result = DomQuery.byId(node.attr("id").value).outerHTML(cdataBlock);
        let sourceForm = result.parents(Const.TAG_FORM).orElse(result.byTagName(Const.TAG_FORM, true));

        this.storeForLaterProcessing(sourceForm, result);
    }

    processDeleteTag( node: XMLQuery) {
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
    processAttributes( node: XMLQuery) {
        let elem = DomQuery.byId(node.id.value);

        node.byTagName("attribute").each((item: XMLQuery) => {
            elem.attr(item.attr("name").value).value = item.attr("value").value;
        });
    }

    replaceViewRoot(shadownResponse: XMLQuery) {

        let head = new XMLQuery(shadownResponse.byTagName(Const.TAG_HEAD));
        let body = new XMLQuery(shadownResponse.byTagName(Const.TAG_BODY));

        if (head.isPresent()) {
            this.replaceHead(head);
        }
        if (body.isPresent()) {
            this.replaceBody(body);
        }
    }

    processInsert( node: XMLQuery) {
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

        this.internalContext.apply(Const.UPDATE_ELEMS).value.push(insertNodes);
    }

    /**
     * process the viewState update, update the affected
     * forms with their respective new viewstate values
     *
     */
    processViewState(node: XMLQuery) {
        this.internalContext.apply("appliedViewState").value = node.textContent("");

        let elem = ResonseDataResolver.resolveSourceElement(this.externalContext, this.internalContext);
        let sourceForm = ResonseDataResolver.resolveSourceForm(this.internalContext, elem);

        if (sourceForm.isPresent()) {
            this.internalContext.apply(Const.UPDATE_FORMS).value.push(sourceForm);
        }
        //no source form found is not an error because
        //we might be able to recover one way or the other
        //TODO issue a warning for the no source form case
    }

    globalEval() {
        let updateElems = new DomQuery(this.internalContext.getIf(Const.UPDATE_ELEMS).value);
        updateElems.runCss();
        updateElems.runScripts();
    }

    fixViewStates() {
        if (this.internalContext.getIf("appliedViewState").isAbsent()) {
            return;
        }
        let viewState = this.internalContext.getIf("appliedViewState").value;
        if (this.isAllFormResolution(this.externalContext)) {
            let forms = DomQuery.querySelectorAll(Const.TAG_FORM);
            this.appendViewStateToForms(forms, viewState);
        } else {
            let updateForms = new DomQuery(this.internalContext.getIf(Const.UPDATE_FORMS).value);
            this.appendViewStateToForms(updateForms, viewState);
        }
    }

    private isAllFormResolution(context: Config) {
        return Lang.instance.getLocalOrGlobalConfig(context, "no_portlet_env", false);
    }

    private appendViewStateToForms(forms: DomQuery, viewState: string) {
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
    private newViewStateElement(parent: DomQuery): DomQuery {
        let newViewState = DomQuery.fromMarkup(
            ["<input type='hidden'", "id='", Const.P_VIEWSTATE, "' name='", Const.P_VIEWSTATE, "' value='' />"].join("")
        );
        newViewState.appendTo(parent);
        return newViewState;
    }
}