import {ArrayCollector, Config, LazyStream, Stream} from "mona-dish";
import {ExtConfig, ExtDomQuery} from "./ExtDomQuery";
import {EMPTY_STR} from "../core/Const";

/*
 * various routines for encoding and decoding url parameters
 * into configs and vice versa
 */

/**
 * merges a list of key value entries into a target config
 * @param target the target receiving the key value entries
 * @param keyValueEntries a list of key value entries divided by =
 * @param paramsMapper a key value remapper
 */
export function mergeKeyValueEntries(target: Config, keyValueEntries: string[], paramsMapper = (key, value) => [key, value]) {

    function splitToKeyVal(line: string) {
        return line.split(/=(.*)/gi);
    }

    function fixKeyWithoutVal(keyVal: string[]) {
        return keyVal.length < 3 ? [keyVal?.[0] ?? [], keyVal?.[1] ?? []] : keyVal;
    }

    let toMerge = new ExtConfig({});
    Stream.of(...keyValueEntries)
        .map(line => splitToKeyVal(line))
        //special case of having keys without values
        .map(keyVal => fixKeyWithoutVal(keyVal))
        .map(keyVal => paramsMapper(keyVal[0] as string, keyVal[1]))
        .each(keyVal => {
            toMerge.append(keyVal[0] as string).value = keyVal?.splice(1)?.join("") ?? "";
        });

    target.shallowMerge(toMerge);
}

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
 * @param encoded
 */
export function decodeEncodedValues(encoded: string): string[] {
    return decodeURIComponent(encoded).split(/&/gi)
        .filter(item => !!(item || '')
            .replace(/\s+/g, ''));
}
