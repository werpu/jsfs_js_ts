import {ArrayCollector, Config, DQ, LazyStream, Stream} from "mona-dish";
import {ExtConfig, ExtDomQuery} from "./ExtDomQuery";
import {EMPTY_STR} from "../core/Const";

/*
 * various routines for encoding and decoding url parameters
 * into configs and vice versa
 */


/**
 * encodes a given form data into a url encoded string
 * @param formData the form data config object
 * @param paramsMapper the params mapper
 * @param defaultStr a default string if nothing comes out of it
 */
export function encodeFormData(formData: Config,
                               paramsMapper = (inStr, inVal) => [inStr, inVal],
                               defaultStr = EMPTY_STR): string {
    if (formData.isAbsent()) {
        return defaultStr;
    }
    let assocValues = formData.value;
    let entries = LazyStream.of(...Object.keys(assocValues))
        .filter(key => assocValues.hasOwnProperty(key))
        .flatMap(key => Stream.of(...assocValues[key]).map(val => paramsMapper(key, val)))
        //we cannot encode file elements that is handled by multipart requests anyway
        .filter(([, value]) => !(value instanceof ExtDomQuery.global().File))
        .map(keyVal => `${encodeURIComponent(keyVal[0])}=${encodeURIComponent(keyVal[1])}`)
        .collect(new ArrayCollector());

    return entries.join("&")
}

/**
 * splits and decodes encoded values into strings containing of key=value
 * @param encoded encoded string
 */
export function decodeEncodedValues(encoded: string): Stream<string[]> {
    return Stream.of(...decodeURIComponent(encoded).split(/&/gi))
        .filter(item => !!(item || '')
            .replace(/\s+/g, ''))
        .map(line => {
            let index = line.indexOf("=");
            if(index == -1) {
                return [line];
            }
            return [line.substring(0, index), line.substring(index+1)];
        })
}


export function resolveFiles(dataSource: DQ): Stream<[string, File]> {
    return dataSource
        .querySelectorAllDeep("input[type='file']")
        .stream
        .map(fileInput => [fileInput.name.value || fileInput.id.value, fileInput.filesFromElem(0)])
        .flatMap(([key, files]) => {
            return Stream.of(...files).map(file => [key, file])
        });
}


export function fixKeyWithoutVal(keyVal: any[]) {
    return keyVal.length < 3 ? [keyVal?.[0] ?? [], keyVal?.[1] ?? []] : keyVal;
}