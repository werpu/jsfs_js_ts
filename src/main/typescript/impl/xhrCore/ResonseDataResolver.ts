import {Config, DomQuery, XMLQuery} from "../../_ext/monadish";
import {Const} from "../core/Const";
import {Assertions} from "../util/Assertions";
import {Lang} from "../util/Lang";

export class ResonseDataResolver {

    static resolveResponseXML(request: Config) {
        let ret = new XMLQuery(request.getIf(Const.SEL_RESPONSE_XML).value);
        Assertions.assertValidXMLResponse(ret);

        return ret;
    }

    static resolveContexts(context: { [p: string]: any }) {
        /**
         * we split the context apart into the external one and
         * some internal values
         */
        let externalContext = Config.fromNullable(context);
        let internalContext = externalContext.getIf(Const.CTX_PARAM_MF_INTERNAL);

        /**
         * prepare storage for some deferred operations
         */
        internalContext.apply(Const.UPDATE_FORMS).value = [];
        internalContext.apply(Const.UPDATE_ELEMS).value = [];
        return {externalContext, internalContext};
    }

    static resolveSourceElement(context: Config, internalContext: Config) {
        let elemId = this.resolveSourceElementId(context, internalContext);
        let elem = DomQuery.byId(elemId.value);
        return elem;
    }

    static resolveSourceForm(internalContext: Config, elem: DomQuery) {
        let sourceFormId = internalContext.getIf(Const.CTX_PARAM_SRC_FRM_ID);
        let sourceForm = new DomQuery(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);
        sourceForm = sourceForm.orElse(elem.parents(Const.TAG_FORM))
            .orElse(elem.querySelectorAll(Const.TAG_FORM))
            .orElse(DomQuery.querySelectorAll(Const.TAG_FORM));
        return sourceForm;
    }

    static resolveSourceElementId(context: Config, internalContext: Config) {
        //?internal context?? used to be external one
        return internalContext.getIf(Const.CTX_PARAM_SRC_CTL_ID)
            .orElseLazy(() => context.getIf(Const.SOURCE, "id").value);
    }




}