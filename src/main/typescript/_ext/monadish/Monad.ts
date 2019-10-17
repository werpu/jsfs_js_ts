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

/**
 * A module which keeps  basic monadish like definitions in place without any sidedependencies to other modules.
 * Useful if you need the functions in another library to keep its dependencies down
 */

/*IMonad definitions*/

import {Lang} from "./Lang";

/**
 * IFunctor interface,
 * defines an interface which allows to map a functor
 * via a first order function to another functor
 */
export interface IFunctor<T> {
    map<R>(fn: (data: T) => R): IFunctor<R>;
}

/**
 * IMonad definition, basically a functor with a flaptmap implementation (flatmap reduces all nested monads after a
 * function call f into a monad with the nesting level of 1
 *
 * flatmap flats nested Monads into a IMonad of the deepest nested implementation
 */
export interface IMonad<T, M extends IMonad<any, any>> extends IFunctor<T> {
    flatMap<T, M>(f: (T) => M): IMonad<any, any>;
}

/**
 * a stateful functor which holds a value upn which a
 * function can be applied
 *
 * as value holder of type T
 */
export interface IIdentity<T> extends IFunctor<T> {
    readonly value: T;
}

/**
 *  custom value holder definition, since we are not pure functional
 *  but iterative we have structures which allow the assignment of a value
 *  also not all structures are sideffect free
 */
export interface IValueHolder<T> {
    value: T | Array<T>;
}

/**
 * Implementation of a monad
 * (Sideffect free), no write allowed directly on the monads
 * value state
 */
export class Monad<T> implements IMonad<T, Monad<any>>, IValueHolder<T> {
    constructor(value: T) {
        this._value = value;
    }

    protected _value: T;

    get value(): T {
        return this._value;
    }

    map<R>(fn?: (data: T) => R): Monad<R> {
        if (!fn) {
            fn = (inval: any) => <R>inval;
        }
        let result: R = fn(this.value);
        return new Monad(result);
    }

    flatMap<R>(fn?: (data: T) => R): Monad<any> {
        let mapped: Monad<any> = this.map(fn);
        while ("undefined" != typeof mapped && mapped != null && mapped.value instanceof Monad) {
            mapped = mapped.value
        }
        return mapped;
    }

}

/*
 * A small stream implementation
 */
export class Stream<T> implements IMonad<T, Stream<any>>, IValueHolder<Array<T>> {

    value: Array<T>;

    constructor(...value: T[]) {
        this.value = value;
    }

    static of<T>(...data: Array<T>): Stream<T> {
        return new Stream<T>(...data);
    }

    each(fn: (data: T, pos ?: number) => void | boolean) {
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (fn(this.value[cnt], cnt) === false) {
                break;
            }
        }
        return this;
    }

    map<R>(fn?: (data: T) => R): Stream<R> {
        if (!fn) {
            fn = (inval: any) => <R>inval;
        }
        let res: R[] = [];
        this.each((item, cnt) => {
            res.push(fn(item))
        });

        return new Stream<R>(...res);
    }

    /*
     * we need to implement it to fullfill the contract, although it is used only internally
     * all values are flattened when accessed anyway, so there is no need to call this methiod
     */
    flatMap<R>(fn?: (data: T) => R): Stream<any> {
        let mapped: Stream<R> = this.map(fn);
        let res = this.mapStreams(mapped);
        return new Stream(...res);
    }

    filter(fn?: (data: T) => boolean): Stream<T> {
        let res: Array<T> = [];
        this.each((data) => {
            if (fn(data)) {
                res.push(data);
            }
        });
        return new Stream<T>(...res);
    }

    reduce(fn: (val1: T, val2: T) => T, startVal: T = null): Optional<T> {
        let offset = startVal != null ? 0 : 1;
        let val1 = startVal != null ? startVal : this.value.length ? this.value[0] : null;

        for (let cnt = offset; cnt < this.value.length; cnt++) {
            val1 = fn(val1, this.value[cnt]);
        }
        return Optional.fromNullable(val1);
    }

    first(): Optional<T> {
        return this.value && this.value.length ? Optional.fromNullable(this.value[0]) : Optional.absent;
    }

    last(): Optional<T> {
        //could be done via reduce, but is faster this way
        return Optional.fromNullable(this.value.length ? this.value[this.value.length - 1] : null);
    }

    anyMatch(fn: (data: T) => boolean): boolean {
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (fn(this.value[cnt])) {
                return true;
            }
        }
        return false;
    }

    allMatch(fn: (data: T) => boolean): boolean {
        if (!this.value.length) {
            return false;
        }
        let matches = 0;
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (fn(this.value[cnt])) {
                matches++;
            }
        }
        return matches == this.value.length;
    }

    noneMatch(fn: (data: T) => boolean): boolean {
        let matches = 0;
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (fn(this.value[cnt])) {
                matches++;
            }
        }
        return matches == this.value.length;
    }

    private mapStreams<R>(mapped: Stream<R>): Array<R> {
        let res: Array<R> = [];
        mapped.each((data: any) => {
            if (data instanceof Stream) {
                res = res.concat(this.mapStreams(data));
            } else {
                res.push(data);
            }
        });
        return res;
    }
}

/**
 * optional implementation, an optional is basically an implementation of a Monad with additional syntactic
 * sugar on top
 * (Sideeffect free, since value assignment is not allowed)
 * */
export class Optional<T> extends Monad<T> {

    /*default value for absent*/
    static absent = Optional.fromNullable(null);

    constructor(value: T) {
        super(value);
    }

    get value(): T {
        if (this._value instanceof Monad) {
            return this._value.flatMap().value
        }
        return this._value;
    }

    static fromNullable<T>(value?: T): Optional<T> {
        return new Optional(value);
    }

    /*syntactic sugar for absent and present checks*/
    isAbsent(): boolean {
        return "undefined" == typeof this.value || null == this.value;
    }

    /**
     * any value present
     */
    isPresent(presentRunnable ?:(val ?: Monad<T>) => void) : boolean {
        let absent = this.isAbsent();
        if(!absent && presentRunnable) {
            presentRunnable.call(this, this)
        }
        return !absent;
    }

    ifPresentLazy(presentRunnable:(val ?: Monad<T>) => void = () => {}): Monad<T> {
        this.isPresent.call(this, presentRunnable);
        return this;
    }


    orElse(elseValue: any): Optional<any> {
        if (this.isPresent()) {
            return this;
        } else {
            //shortcut
            if (elseValue == null) {
                return Optional.absent;
            }
            return this.flatMap(() => elseValue);
        }
    }

    /**
     * lazy, passes a function which then is lazily evaluated
     * instead of a direct value
     * @param func
     */
    orElseLazy(func: () => any): Optional<any> {
        if (this.isPresent()) {
            return this;
        } else {
            return this.flatMap(func);
        }
    }

    /*
     * we need to implement it to fullfill the contract, although it is used only internally
     * all values are flattened when accessed anyway, so there is no need to call this methiod
     */
    flatMap<R>(fn?: (data: T) => R): Optional<any> {
        let val = super.flatMap(fn);
        if (!(val instanceof Optional)) {
            return Optional.fromNullable(val.value);
        }

        return <Optional<any>>val.flatMap();
    }

    /*
     * elvis operation, take care, if you use this you lose typesafety and refactoring
     * capabilites, unfortunately typesceript does not allow to have its own elvis operator
     * this is some syntactic sugar however which is quite useful*/
    getIf<R>(...key: string[]): Optional<R> {

        let currentPos: Optional<any> = this;
        for (let cnt = 0; cnt < key.length; cnt++) {
            let currKey = this.keyVal(key[cnt]);
            let arrPos = this.arrayIndex(key[cnt]);

            if (currKey === "" && arrPos >= 0) {
                currentPos = this.getClass().fromNullable(!(currentPos.value instanceof Array) ? null : (currentPos.value.length < arrPos ? null : currentPos.value[arrPos]));
                if (currentPos.isAbsent()) {
                    return currentPos;
                }
                continue;
            } else if (currKey && arrPos >= 0) {
                if (currentPos.getIfPresent(currKey).isAbsent()) {
                    return currentPos;
                }
                currentPos = (currentPos.getIfPresent(currKey).value instanceof Array) ? this.getClass().fromNullable(currentPos.getIfPresent(currKey).value[arrPos]) : this.getClass().absent;
                if (currentPos.isAbsent()) {
                    return currentPos;
                }
                continue;

            } else {
                currentPos = currentPos.getIfPresent(currKey);
            }
            if (currentPos.isAbsent()) {
                return currentPos;
            } else if (arrPos > -1) {
                currentPos = this.getClass().fromNullable(currentPos.value[arrPos]);
            }
        }
        let retVal = currentPos;

        return retVal;
    }

    /**
     * simple match, if the first order function call returns
     * true then there is a match, if the value is not present
     * it never matches
     *
     * @param fn the first order function performing the match
     */
    match(fn: (item: T) => boolean): boolean {
        if (this.isAbsent()) {
            return false
        }
        return fn(this.value);
    }

    /**
     * convenience function to flatmap the internal value
     * and replace it with a default in case of being absent
     *
     * @param defaultVal
     * @returns {Optional<any>}
     */
    get<R>(defaultVal: any = Optional.absent): Optional<R> {
        if (this.isAbsent()) {
            return this.getClass().fromNullable(defaultVal).flatMap();
        }

        return this.getClass().fromNullable(this.value).flatMap();
    }

    toJson(): string {
        return JSON.stringify(this.value);
    }

    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns {Monadish.Optional}
     */
    protected getClass(): any {
        return Optional;
    }

    /*helper method for getIf with array access aka <name>[<indexPos>]*/
    protected arrayIndex(key: string): number {
        let start = key.indexOf("[");
        let end = key.indexOf("]");
        if (start >= 0 && end > 0 && start < end) {
            return parseInt(key.substring(start + 1, end));
        } else {
            return -1;
        }
    }

    /*helper method for getIf with array access aka <name>[<indexPos>]*/
    protected keyVal(key: string): string {
        let start = key.indexOf("[");

        if (start >= 0) {
            return key.substring(0, start);
        } else {
            return key;
        }
    }

    /**
     * additional syntactic sugar which is not part of the usual optional implementation
     * but makes life easier, if you want to sacrifice typesafety and refactoring
     * capabilities in typescript
     */
    private getIfPresent<R>(key: string): Optional<R> {
        if (this.isAbsent()) {
            return this.getClass().absent;
        }
        return this.getClass().fromNullable(this.value[key]).flatMap();
    }

}

/**
 * helper class to allow write access to the config
 * in certain situations (after an apply call)
 */
class ConfigEntry<T> implements IValueHolder<T> {
    rootElem: any;
    key: any;
    arrPos: number;

    constructor(rootElem: any, key: any, arrPos?: number) {
        this.rootElem = rootElem;
        this.key = key;
        this.arrPos = ("undefined" != typeof arrPos) ? arrPos : -1;
    }

    get value() {
        if (this.key == "" && this.arrPos >= 0) {
            return this.rootElem[this.arrPos];
        } else if (this.key && this.arrPos >= 0) {
            return this.rootElem[this.key][this.arrPos];
        }
        return this.rootElem[this.key];
    }

    set value(val: T) {
        if (this.key == "" && this.arrPos >= 0) {
            this.rootElem[this.arrPos] = val;
            return;
        } else if (this.key && this.arrPos >= 0) {
            this.rootElem[this.key][this.arrPos] = val;
            return;
        }
        this.rootElem[this.key] = val;
    }
}

/**
 * Config, basically an optional wrapper for a json structure
 * (not sideeffect free, since we can alter the internal config state
 * without generating a new config), not sure if we should make it sideffect free
 * since this would swallow a lot of performane and ram
 */
export class Config extends Optional<any> {
    constructor(root: any) {
        super(root);
    }

    get shallowCopy(): Config {
        return new Config(Lang.instance.mergeMaps([{}, this.value || {}]));
    }

    static fromNullable<T>(value?: any): Config {
        return new Config(value);
    }

    /**
     * simple merge for the root configs
     */
    shallowMerge(other: Config, overwrite = true) {
        for(let key in other.value) {
            if(overwrite  && key in this.value) {
                this.apply(key).value = other.getIf(key).value;
            } else if(!(key in this.value)) {
                this.apply(key).value = other.getIf(key).value;
            }
        }
    }

    apply(...keys: Array<any>): IValueHolder<any> {
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

    applyIf(condition: boolean, ...keys: Array<any>): IValueHolder<any> {
        return condition ? this.apply(...keys) : {value: null};
    }

    getIf(...keys: Array<string>): Config {
        return this.getClass().fromNullable(super.getIf.apply(this, keys).value);
    }

    get(defaultVal: any): Config {
        return this.getClass().fromNullable(super.get(defaultVal).value);
    }

    //empties the current config entry
    delete(key: string): Config {
        if (key in this.value) {
            delete this.value[key];
        }
        return this;
    }

    toJson(): any {
        return JSON.stringify(this.value);
    }

    protected getClass(): any {
        return Config;
    }

    private setVal(val: any) {
        this._value = val;
    }

    private buildPath(keys: Array<any>): Config {
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

/*we do not implenent array, maps etc.. monads there are libraries like lodash which have been doing that for ages*/

