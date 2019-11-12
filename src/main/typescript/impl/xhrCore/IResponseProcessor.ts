import {XMLQuery} from "../../ext/monadish";
import {DQ} from "../../ext/monadish/DomQuery";

/**
 * response processor interface
 * We expose an interface
 * to allow a clear contract for future
 * testing and implementation extension points
 */
export interface IResponseProcessor {

    /**
     * replace the head element
     *
     * @param shadowHead
     */
    replaceHead(shadowHead: XMLQuery | DQ): void;

    /**
     * replace the body
     *
     * @param shadowBody
     */
    replaceBody(shadowBody: XMLQuery | DQ): void;

    /**
     * Leaf Tag eval... process whatever is in the evals cdata block
     *
     * @param node
     */
    eval(node: XMLQuery): void;

    /**
     * processes an incoming error from the response
     * which is hosted under the &lt;error&gt; tag
     * @param request the current request
     * @param context the contect object
     * @param node the node in the xml hosting the error message
     */
    error(node: XMLQuery): void;

    /**
     * process the redirect operation
     *
     * @param request
     * @param context
     * @param internalContext
     * @param node
     */
    redirect(node: XMLQuery): void;

    /**
     * processes the update operation and updates the node with the cdata block
     * @param context
     * @param internalContext
     * @param node
     * @param cdataBlock
     */
    update(node: XMLQuery, cdataBlock: string): void;

    /**
     * delete operation, deletes the data from
     * node from the dom
     *
     * @param node
     */
    delete(node: XMLQuery): void;

    /**
     * attributes leaf tag... process the attributes
     *
     * @param request
     * @param context
     * @param internalContext
     * @param node
     */
    attributes(node: XMLQuery): void;

    /**
     * replace the entire viewroot
     * with shadowResponse
     * @param shadownResponse
     */
    replaceViewRoot(shadownResponse: XMLQuery | DQ): void;

    /**
     * jsf insert resolution
     * which then has to handle the before and after situation
     *
     * @param node
     */
    insert(node: XMLQuery): void;

    /**
     * insert with before, after subtags
     * @param node
     */
    insertWithSubtags(node: XMLQuery);

    /**
     * process the viewState update, update the affected
     * forms with their respective new viewstate values
     *
     */
    processViewState(node: XMLQuery): void;

    /**
     * evals all processed elements of so far
     * and executes the embedded scripts
     */
    globalEval(): void;

    /**
     * fix the viewstates of all processed forms
     */
    fixViewStates(): void;
}