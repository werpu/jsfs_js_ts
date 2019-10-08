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
    protected _value: T;

    constructor(value: T) {
        this._value = value;
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


    get value(): T {
        return this._value;
    }

}

/*
 * A small stream implementation
 */
export class Stream<T> implements IMonad<T, Stream<any>>, IValueHolder<Array<T>>{

    static of<T>(... data: Array<T>): Stream<T> {
        return new Stream<T>(... data);
    }

    value: Array<T>;
    constructor(...value: T[]){
        this.value = value;
    }

    each(fn: (data: T, pos ?: number) => void | boolean) {
        for(let cnt = 0; cnt < this.value.length ; cnt++) {
            if(fn(this.value[cnt], cnt) === false) {
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
        let mapped:Stream<R> = this.map(fn);
        let res = this.mapStreams(mapped);
        return new Stream(...res);
    }

    filter(fn?: (data: T) => boolean): Stream<T> {
        let res: Array<T> = [];
        this.each((data) => {
            if(fn(data)) {
                res.push(data);
            }
        });
        return new Stream<T>(...res);
    }

    reduce(fn: (val1: T, val2:T) => T, startVal: T = null): Optional<T> {
        let offset = startVal != null ? 0 : 1;
        let val1 = startVal != null ? startVal : this.value.length ? this.value[0] : null;

        for(let cnt = offset; cnt < this.value.length; cnt++) {
            val1 = fn(val1, this.value[cnt]);
        }
        return Optional.fromNullable(val1);
    }

    first(): Optional<T> {
        return this.value && this.value.length ? Optional.fromNullable(this.value[0]) : Optional.absent;
    }


    last(): Optional<T> {
        //could be done via reduce, but is faster this way
        return Optional.fromNullable(this.value.length ? this.value[this.value.length -1] : null);
    }

    anyMatch(fn: (data: T) => boolean): boolean {
        for(let cnt = 0; cnt < this.value.length; cnt++) {
            if(fn(this.value[cnt])) {
                return true;
            }
        }
        return false;
    }

    allMatch(fn: (data: T) => boolean): boolean {
        if(!this.value.length) {
            return false;
        }
        let matches = 0;
        for(let cnt = 0; cnt < this.value.length; cnt++) {
            if(fn(this.value[cnt])) {
                matches++;
            }
        }
        return matches == this.value.length;
    }

    noneMatch(fn: (data: T) => boolean): boolean {
        let matches = 0;
        for(let cnt = 0; cnt < this.value.length; cnt++) {
            if(fn(this.value[cnt])) {
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


    constructor(value: T) {
        super(value);
    }

    static fromNullable<T>(value?: T): Optional<T> {
        return new Optional(value);
    }

    /*default value for absent*/
    static absent = Optional.fromNullable(null);

    /*syntactic sugar for absent and present checks*/
    isAbsent(): boolean {
        return "undefined" == typeof this.value || null == this.value;
    }

    isPresent(): boolean {
        return !this.isAbsent();
    }

    presentOrElse(elseValue: any): Optional<any> {
        if (this.isPresent()) {
            return this;
        } else {
            return this.flatMap(this.getClass().fromNullable(elseValue));
        }
    }

    /*
     * we need to implement it to fullfill the contract, although it is used only internally
     * all values are flattened when accessed anyway, so there is no need to call this methiod
     */
    flatMap<R>(fn?: (data: T) => R): Optional<any> {
        var val = super.flatMap(fn);
        if (!(val instanceof Optional)) {
            return Optional.fromNullable(val.value);
        }
        return <Optional<any>> val.flatMap();
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
                currentPos = this.getClass().fromNullable(!(currentPos.value instanceof Array ) ? null : (currentPos.value.length < arrPos ? null : currentPos.value[arrPos]));
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

    get value(): T {
        if (this._value instanceof Monad) {
            return this._value.flatMap().value
        }
        return this._value;
    }

    /**
     * simple match, if the first order function call returns
     * true then there is a match, if the value is not present
     * it never matches
     *
     * @param fn the first order function performing the match
     */
    match(fn: (item: T) => boolean): boolean {
        if(this.isAbsent()) {
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

    toJson(): string {
        return JSON.stringify(this.value);
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

    static fromNullable<T>(value?: any): Config {
        return new Config(value);
    }

    apply(...keys: Array<any>): IValueHolder<any> {
        if (keys.length < 1) {
            return;
        }

        this.buildPath(keys);

        let currKey = this.keyVal(keys[keys.length - 1]);
        let arrPos = this.arrayIndex(keys[keys.length - 1]);
        var retVal = new ConfigEntry(keys.length == 1 ? this.value : this.getIf.apply(this, keys.slice(0, keys.length - 1)).value,
            currKey, arrPos
        );

        return retVal;
    }


    getIf(...keys: Array<string>): Config {
        return this.getClass().fromNullable(super.getIf.apply(this, keys).value);
    }

    get(defaultVal: any): Config {
        return this.getClass().fromNullable(super.get(defaultVal).value);
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
                for (var cnt = arr.length; cnt < length; cnt++) {
                    arr.push({});
                }
            }
        };


        for (var cnt = 0; cnt < keys.length; cnt++) {
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

            let tempVal = <Config> val.getIf(currKey);
            if (arrPos == -1) {
                if (tempVal.isAbsent()) {
                    tempVal = <Config> this.getClass().fromNullable(val.value[currKey] = {});
                } else {
                    val = <any>tempVal;
                }
            } else {
                var arr = (tempVal.value instanceof Array) ? tempVal.value : [];
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


export enum PromiseStatus {
    PENDING, FULLFILLED, REJECTED
}

export interface IPromise {
    then(executorFunc: (val: any) => any): IPromise;

    catch(executorFunc: (val: any) => any): IPromise

    finally(executorFunc: () => void): IPromise;

}


/**
 * helper function to savely resolve anything
 * this is not an elvis operator, it resolves
 * a value without exception in a tree and if
 * it is not resolvable then an optional of
 * a default value is restored or Optional.empty
 * if none is given
 *
 * usage
 * <code>
 *     let var: Optiona<string> = saveResolve(() => a.b.c.d.e, "foobaz")
 * </code>
 *
 * @param resolverProducer a lambda which can produce the value
 * @param defaultValue an optional default value if the producer failes to produce anything
 * @returns an Optional of the produced value
 */

export function saveResolve<T>(resolverProducer: () => T, defaultValue:T = null): Optional<T> {
    try {
        let result = resolverProducer();
        if("undefined" == typeof result || null == result) {
            return Optional.fromNullable(defaultValue);
        }
        return Optional.fromNullable(result);
    } catch (e) {
        return Optional.absent;
    }
}

/**
 * a small (probably not 100% correct, although I tried to be correct as possible) Promise implementation
 * for systems which do not have a promise implemented
 * Note, although an internal state is kept, this is sideffect free since
 * is value is a function to operate on, hence no real state is kept internally, except for the then
 * and catch calling order
 */
export class Promise implements IPromise {

    private value: (resolve: (val?: any) => void, reject: (val?: any) => void) => void;

    status = PromiseStatus.PENDING;

    protected allFuncs: Array<any> = [];

    constructor(executor: (resolve: (val?: any) => void, reject: (val?: any) => void) => void) {
        //super(executor);
        this.value = executor;
        this.value((data: any) => this.resolve(data), (data: any) => this.reject(data));
    }

    static all(...promises: Array<IPromise>): IPromise {

        var promiseCnt = 0;
        var myapply: Function;

        var myPromise = new Promise((apply: Function, reject: Function) => {
            myapply = apply;
        });
        var executor = () => {
            promiseCnt++;

            if (promises.length == promiseCnt) {
                myapply();
            }
        };
        (<any>executor).__last__ = true;

        for (var cnt = 0; cnt < promises.length; cnt++) {
            promises[cnt].finally(executor);
        }
        return myPromise;
    }


    static race(...promises: Array<IPromise>): IPromise {

        var promiseCnt = 0;
        var myapply: Function;
        var myreject: Function;

        var myPromise = new Promise((apply: Function, reject: Function) => {
            myapply = apply;
            myreject = reject;
        });


        var thenexecutor = (): IPromise => {
            if (!!myapply) {
                myapply();
            }
            myapply = null;
            myreject = null;
            return null;
        };
        (<any>thenexecutor).__last__ = true;

        var catchexeutor = (): IPromise => {
            if (!!myreject) {
                myreject();
            }
            myreject = null;
            myapply = null;
            return null;
        };
        (<any>catchexeutor).__last__ = true;

        for (var cnt = 0; cnt < promises.length; cnt++) {
            promises[cnt].then(thenexecutor);
            promises[cnt].catch(catchexeutor);
        }
        return myPromise;
    }

    static reject(reason: any): Promise {
        var retVal = new Promise((resolve: any, reject: any) => {
            //not really doable without a hack
            if (reason instanceof Promise) {
                reason.then((val: any) => {
                    reject(val);
                });
            } else {
                setTimeout(() => {
                    reject(reason);
                }, 1);
            }
        });

        return retVal;
    }

    static resolve(reason: any): Promise {
        var retVal = new Promise((resolve: any, reject: any) => {
            //not really doable without a hack
            if (reason instanceof Promise) {
                reason.then((val) => resolve(val));
            } else {
                setTimeout(() => {
                    resolve(reason);
                }, 1);
            }
        });

        return retVal;

    }

    then(executorFunc: (val?: any) => any, catchfunc?: (val?: any) => any): Promise {
        this.allFuncs.push({"then": executorFunc});
        if (catchfunc) {
            this.allFuncs.push({"catch": catchfunc});
        }
        this.spliceLastFuncs();
        return this;
    }

    catch(executorFunc: (val?: any) => void): Promise {
        this.allFuncs.push({"catch": executorFunc});
        this.spliceLastFuncs();
        return this;
    }


    finally(executorFunc: () => void): Promise {
        if ((<any>this).__reason__) {
            (<any>this).__reason__.finally(executorFunc);
            return;
        }

        this.allFuncs.push({"finally": executorFunc});
        this.spliceLastFuncs();
        return this;
    }

    private spliceLastFuncs() {
        let lastFuncs = [];
        let rest = [];
        for (var cnt = 0; cnt < this.allFuncs.length; cnt++) {
            for (var key in this.allFuncs[cnt]) {
                if (this.allFuncs[cnt][key].__last__) {
                    lastFuncs.push(this.allFuncs[cnt]);
                } else {
                    rest.push(this.allFuncs[cnt]);
                }
            }
        }
        this.allFuncs = rest.concat(lastFuncs);
    }


    protected resolve(val?: any) {


        while (this.allFuncs.length) {
            if (!this.allFuncs[0].then) {
                break;
            }
            var fn = this.allFuncs.shift();

            var funcResult = Optional.fromNullable(fn.then(val));

            if (funcResult.isPresent()) {
                funcResult = funcResult.flatMap();
                val = funcResult.value;
                if (val instanceof Promise) {
                    //var func = (newVal: any) => {this.resolve(newVal)};
                    //func.__last__  = true;
                    //val.then(func);
                    this.transferIntoNewPromise(val);

                    return;
                }
            } else {
                break;
            }
        }

        this.appyFinally();
        this.status = PromiseStatus.FULLFILLED;
    }

    protected reject(val?: any) {

        while (this.allFuncs.length) {
            if (this.allFuncs[0].finally) {
                break;
            }
            var fn = this.allFuncs.shift();
            if (fn.catch) {
                var funcResult = Optional.fromNullable(fn.catch(val));
                if (funcResult.isPresent()) {
                    funcResult = funcResult.flatMap();
                    val = funcResult.value;
                    if (val instanceof Promise) {
                        //val.then((newVal: any) => {this.resolve(newVal)});
                        this.transferIntoNewPromise(val);
                        return;
                    }
                    this.status = PromiseStatus.REJECTED;
                    break;
                } else {
                    break;
                }
            }
        }

        this.status = PromiseStatus.REJECTED;
        this.appyFinally();
    }

    private transferIntoNewPromise(val: any) {
        for (var cnt = 0; cnt < this.allFuncs.length; cnt++) {
            for (let key in this.allFuncs[cnt]) {
                val[key](this.allFuncs[cnt][key]);
            }
        }
    }

    protected appyFinally() {
        while (this.allFuncs.length) {
            var fn = this.allFuncs.shift();
            if (fn.finally) {
                fn.finally();
            }
        }
    }
}

/**
 * a cancellable promise
 * a Promise with a cancel function, which can be cancellend any time
 * this is useful for promises which use cancellable asynchronous operations
 * note, even in a cancel state, the finally of the promise is executed, however
 * subsequent thens are not anymore.
 * The current then however is fished or a catch is called depending on how the outer
 * operation reacts to a cancel order.
 */
export class CancellablePromise extends Promise {

    private cancellator = () => {
    };

    /**
     * @param executor asynchronous callback operation which triggers the callback
     * @param cancellator cancel operation, separate from the trigger operation
     */
    constructor(executor: (resolve: (val?: any) => void, reject: (val?: any) => void) => void, cancellator: () => void) {
        super(executor);
        this.cancellator = cancellator;
    }

    cancel() {
        this.status = PromiseStatus.REJECTED;
        this.appyFinally();
        //lets terminate it once and for all, the finally has been applied
        this.allFuncs = [];
    }


    then(executorFunc: (val?: any) => any, catchfunc?: (val?: any) => any): CancellablePromise {
        return <CancellablePromise> super.then(executorFunc, catchfunc);
    }

    catch(executorFunc: (val?: any) => void): CancellablePromise {
        return <CancellablePromise> super.catch(executorFunc);
    }

    finally(executorFunc: () => void): CancellablePromise {
        return <CancellablePromise> super.finally(executorFunc);
    }
}

/*we do not implenent array, maps etc.. monads there are libraries like lodash which have been doing that for ages*/

