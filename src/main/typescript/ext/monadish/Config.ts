/* Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Stream} from "./Stream";
import {AssocArrayCollector} from "./SourcesCollectors";
import {IConfig, IValueHolder, IValueEmbedder, IMonad, IOptional} from "./Types";
import {Monad, Optional, ValueEmbedder} from "./Monad";
import {Lang} from "./Lang";
import deepCopy = Lang.deepCopy;

class EmptyConfigEntry  extends ValueEmbedder<any> {

    constructor(rootElem: any = {}, valueKey: string = "booga") {
        super(rootElem, valueKey);
    }

    get value() {
        return null;
    }
    set value(newVal: any) {
    }


}

/**
 * specialized value embedder
 * for our Configuration
 */
class ConfigEntry<T> extends ValueEmbedder<T> {

    /*default value for absent*/
    static absent = ConfigEntry.fromNullable(null);

    arrPos: number;

    constructor(rootElem: any, key: any, arrPos?: number) {
        super(rootElem, key);

        this.arrPos =  arrPos ?? -1;
    }

    get value() {
        if (this.key == "" && this.arrPos >= 0) {
            return this._value[this.arrPos];
        } else if (this.key && this.arrPos >= 0) {
            return this._value[this.key][this.arrPos];
        }
        return this._value[this.key];
    }

    set value(val: T) {
        if (this.key == "" && this.arrPos >= 0) {
            this._value[this.arrPos] = val;
            return;
        } else if (this.key && this.arrPos >= 0) {
            this._value[this.key][this.arrPos] = val;
            return;
        }
        this._value[this.key] = val;
    }
}


/**
 * Config, basically an optional wrapper for a json structure
 * (not sideeffect free, since we can alter the internal config state
 * without generating a new config), not sure if we should make it sideffect free
 * since this would swallow a lot of performane and ram
 *
 * having its own file to have finer granularsation, you often dont even need
 * a full config, some smaller helpers doing the same in a less precise manner can be found in Lang.
 */
export class Config extends Optional<any> implements IConfig {
    constructor(root: any) {
        super(root);
    }

    get shallowCopy(): IConfig {
        return <IConfig> new Config(Stream.ofAssoc(this.value).collect(new AssocArrayCollector()));
    }

    get deepCopy(): IConfig {
        return <IConfig> new Config(deepCopy(this.value));
    }

    static fromNullable<T>(value?: any): IConfig {
        return <IConfig> new Config(value);
    }

    /**
     * simple merge for the root configs
     */
    shallowMerge(other: IConfig, overwrite = true) {
        for (let key in other.value) {
            if (overwrite && key in this.value) {
                this.assign(key).value = other.getIf(key).value;
            } else if (!(key in this.value)) {
                this.assign(key).value = other.getIf(key).value;
            }
        }
    }

    assign(...keys): IValueEmbedder<any> {
        if (keys.length < 1) {
            return;
        }

        this.buildPath(keys);

        let currKey = this.keyVal(keys[keys.length - 1]);
        let arrPos = this.arrayIndex(keys[keys.length - 1]);
        let retVal = new ConfigEntry(keys.length == 1 ? this.value : this.getIf.apply(this, keys.slice(0, keys.length - 1)).value,
            currKey, arrPos
        );

        return retVal;
    }

    assignIf(condition: boolean, ...keys: Array<any>): IValueEmbedder<any> {
        return  condition ? this.assign(...keys) : new EmptyConfigEntry() ;
    }

    getIf(...keys: Array<string>): Config {
        return this.getClass().fromNullable(super.getIf.apply(this, keys).value);
    }

    get(defaultVal: any): Config {
        return this.getClass().fromNullable(super.get(defaultVal).value);
    }

    //empties the current config entry
    delete(key: string): IConfig {
        if (key in this.value) {
            delete this.value[key];
        }
        return this;
    }

    toJson(): any {
        return JSON.stringify(this.value);
    }

    getClass(): any {
        return Config;
    }

    setVal(val: any) {
        this._value = val;
    }

    buildPath(keys: Array<any>): Config {
        let val = this;
        let parentVal = this.getClass().fromNullable(null);
        let parentPos = -1;
        let alloc = function (arr: Array<any>, length: number) {
            if (arr.length < length) {
                for (let cnt = arr.length; cnt < length; cnt++) {
                    arr.push({});
                }
            }
        };

        for (let cnt = 0; cnt < keys.length; cnt++) {
            let currKey = this.keyVal(keys[cnt]);
            let arrPos = this.arrayIndex(keys[cnt]);

            if (currKey === "" && arrPos >= 0) {

                val.setVal((val.value instanceof Array) ? val.value : []);
                alloc(val.value, arrPos + 1);
                if (parentPos >= 0) {
                    parentVal.value[parentPos] = val.value;
                }
                parentVal = val;
                parentPos = arrPos;
                val = this.getClass().fromNullable(val.value[arrPos]);
                continue;
            }

            let tempVal = <Config>val.getIf(currKey);
            if (arrPos == -1) {
                if (tempVal.isAbsent()) {
                    tempVal = <Config>this.getClass().fromNullable(val.value[currKey] = {});
                } else {
                    val = <any>tempVal;
                }
            } else {
                let arr = (tempVal.value instanceof Array) ? tempVal.value : [];
                alloc(arr, arrPos + 1);
                val.value[currKey] = arr;
                tempVal = this.getClass().fromNullable(arr[arrPos]);
            }
            parentVal = val;
            parentPos = arrPos;
            val = <any>tempVal;
        }

        return this;
    }
}
