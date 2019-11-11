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



import {
    ArrayMapper,
    Comparator,
    IteratableConsumer, LazyStream,
    Mappable,
    Matchable,
    Reducable,
    Stream,
    StreamMapper
} from "./Stream";
import {Optional} from "./Monad";
import {XMLQuery} from "./XmlQuery";
import {DomQuery} from "./DomQuery";


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


export interface IValueEmbedder<T> extends IOptional<T>{

    value: T;

    orElse(elseValue: any): IOptional<any>;

    orElseLazy(func: () => any): IOptional<any>;

    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns {Monadish.Optional}
     */
    getClass(): any;
}

export interface IOptional<T> extends IMonad<T, IMonad<any, any>>{

    readonly value: T;

    isAbsent(): boolean;

    /**
     * any value present
     */
    isPresent(presentRunnable ?: (val ?: IMonad<T, any>) => void): boolean;

    ifPresentLazy(presentRunnable: (val ?: IMonad<T, any>) => void): IMonad<T, any>;

    orElse(elseValue: any): IOptional<any>;

    /**
     * lazy, passes a function which then is lazily evaluated
     * instead of a direct value
     * @param func
     */
    orElseLazy(func: () => any): IOptional<any>;

    flatMap<R>(fn?: (data: T) => R): IOptional<any>;

    getIf<R>(...key: string[]): IOptional<R>;

    /**
     * simple match, if the first order function call returns
     * true then there is a match, if the value is not present
     * it never matches
     *
     * @param fn the first order function performing the match
     */
    match(fn: (item: T) => boolean): boolean;

    /**
     * convenience function to flatmap the internal value
     * and replace it with a default in case of being absent
     *
     * @param defaultVal
     * @returns {Optional<any>}
     */
    get<R>(defaultVal: any): IOptional<R>;

    toJson(): string;

    arrayIndex(key: string): number;

    keyVal(key: string): string;

    /**
     * additional syntactic sugar which is not part of the usual optional implementation
     * but makes life easier, if you want to sacrifice typesafety and refactoring
     * capabilities in typescript
     */
    getIfPresent<R>(key: string): IOptional<R>;

    /**
     * elvis like typesafe functional save resolver
     * a typesafe option for getIfPresent
     *
     * usage myOptional.resolve(value => value.subAttr.subAttr2).orElseLazy(....)
     * if this is resolvable without any errors an Optional with the value is returned
     * if not, then an Optional absent is returned, also if you return Optional absent
     * it is flatmapped into absent
     *
     * @param resolver the resolver function, can throw any arbitrary errors, int  the error case
     * the resolution goes towards absent
     */
    resolve<V>(resolver: (item: T) => V): IOptional<V>;
}



/**
 * Config interface to decouple the config implementation for smaller filesizes
 */
export interface IConfig extends IValueEmbedder<any> {
    readonly shallowCopy: IConfig;
    readonly deepCopy: IConfig;

    /**
     * simple merge for the root configs
     */
    shallowMerge(other: IConfig, overwrite): void;

    assign(...keys): IValueHolder<any>;

    assignIf(condition: boolean, ...keys: Array<any>): IValueEmbedder<any>;

    getIf(...keys: Array<string>): IConfig;

    get(defaultVal: any): IConfig;

    delete(key: string): IConfig;

    toJson(): any;

    getClass(): any;

    setVal(val: any): void;

    buildPath(keys: Array<any>): IConfig;
}


/**
 * Every data source wich feeds data into the lazy stream
 * or stream generally must implement this interface
 *
 * It is basically an iteratable to the core
 */
export interface IStreamDataSource<T> {

    /**
     * @returns true if additional data is present
     */
    hasNext(): boolean;

    /**
     * false if not
     */
    next(): T;

    /**
     * resets the position to the beginning
     */
    reset(): void;
}

/**
 * A collector, needs to be implemented
 */
export interface ICollector<T, S> {
    /**
     * this method basically takes a single stream element
     * and does something with it (collecting it one way or the other
     * in most cases)
     *
     * @param element
     */
    collect(element: T);

    /**
     * the final result after all the collecting is done
     */
    finalValue: S;
}




/**
 * Generic interface defining a stream
 */
export interface IStream<T> {
    /**
     * Perform the operation fn on a single element in the stream at a time
     * then pass the stream over for further processing
     * This is basically an intermediate point in the stream
     * with further processing happening later, do not use
     * this method to gather data or iterate over all date for processing
     * (for the second case each has to be used)
     *
     * @param fn the processing function, if it returns false, further processing is stopped
     */
    onElem(fn: IteratableConsumer<T>): IStream<T>;

    /**
     * Iterate over all elements in the stream and do some processing via fn
     *
     * @param fn takes a single element and if it returns false
     * then further processing is stopped
     */
    each(fn: IteratableConsumer<T>): void;

    /**
     * maps a single element into another via fn
     * @param fn function which takes one element in and returns another
     */
    map<R>(fn?: Mappable<T, R>): IStream<R>;

    /**
     * Takes an element in and returns a set of something
     * the set then is flatted into a single stream to be further processed
     *
     * @param fn
     */
    flatMap<R>(fn?: StreamMapper<T> | ArrayMapper<T>): IStream<R>;

    /**
     * filtering, takes an element in and is processed by fn.
     * If it returns false then further processing on this element is skipped
     * if it returns true it is passed down the chain.
     *
     * @param fn
     */
    filter(fn?: Matchable<T>): IStream<T>;

    /**
     * functional reduce... takes two elements in the stream and reduces to
     * one from left to right
     *
     * @param fn the reduction function for instance (val1,val2) => val1l+val2
     * @param startVal an optional starting value, if provided the the processing starts with this element
     * and further goes down into the stream, if not, then the first two elements are taken as reduction starting point
     */
    reduce(fn: Reducable<T>, startVal: T): IOptional<T>;

    /**
     * returns the first element in the stream is given as Optional
     */
    first(): IOptional<T>;

    /**
     * Returns the last stream element (note in endless streams without filtering and limiting you will never reach that
     * point hence producing an endless loop)
     */
    last(): IOptional<T>;

    /**
     * returns true if there is at least one element where a call fn(element) produces true
     *
     * @param fn
     */
    anyMatch(fn: Matchable<T>): boolean;

    /**
     * returns true if all elmements produce true on a call to fn(element)
     *
     * @param fn
     */
    allMatch(fn: Matchable<T>): boolean;

    /**
     * returns true if no elmements produce true on a call to fn(element)
     *
     * @param fn
     */
    noneMatch(fn: Matchable<T>): boolean;

    /**
     * Collect the elements with a collector given
     * There are a number of collectors provided
     *
     * @param collector
     */
    collect(collector: ICollector<T, any>): any;

    /**
     * sort on the stream, this is a special case
     * of an endpoint, so your data which is fed in needs
     * to be limited otherwise it will fail
     * it still returns a stream for further processing
     *
     * @param comparator
     */
    sort(comparator: Comparator<T>): IStream<T>;

    /**
     * Limits the stream to a certain number of elements
     *
     * @param end the limit of the stream
     */
    limits(end: number): IStream<T>;

    /**
     * returns the stream collected into an array (90% use-case abbreviation
     */
    value: Array<T>;
}

export interface IElementAttribute {
    element: DomQuery;
    name: string;
    defaultVal: string;
    value: string;

    getClass(): any;
}



export interface IDomQuery {
    /**
     * reads the first element if it exists and returns an optional
     */
    readonly value: IOptional<Element>;
    /**
     * All elements as array
     */
    readonly values: Element[];
    /**
     * returns the id as settable value (See also ValueEmbedder)
     */
    readonly id: IValueEmbedder<string>;
    /**
     * returns the length of embedded nodes (top level)
     */
    readonly length: number;
    /**
     * the tag name of the first element
     */
    readonly tagName: IOptional<string>;
    /**
     * the node name of the first element
     */
    readonly nodeName: IOptional<string>;
    /**
     * the type of the first element
     */
    readonly type: IOptional<string>;
    /**
     * The name as changeable value
     */
    readonly name: IValueEmbedder<string>;
    /**
     * The the value in case of inputs as changeable value
     */
    readonly inputValue: IValueEmbedder<string | boolean>;
    /**
     * the underlying form elements as domquery object
     */
    readonly elements: IDomQuery;
    /**
     * settable flag for disabled
     */
    disabled: boolean;
    /**
     * The child nodes of this node collection as readonly attribute
     */
    readonly childNodes: IDomQuery;
    /**
     * an early stream representation for this DomQuery
     */
    readonly stream: Stream<IDomQuery>;
    /**
     * lazy stream representation for this DomQuery
     */
    readonly lazyStream: LazyStream<IDomQuery>;
    /**
     * transform this node collection to an array
     */
    readonly asArray: Array<IDomQuery>;

    /**
     * returns true if the elements have the tag *tagName* as tag embedded (highest level)
     * @param tagName
     */
    isTag(tagName: string): boolean;

    /**
     * returns the nth element as domquery
     * from the internal elements
     * note if you try to reach a non existing element position
     * you will get back an absent entry
     *
     * @param index the nth index
     */
    get(index: number): IDomQuery;

    /**
     * returns the nth element as optional of an Element object
     * @param index the number from the index
     * @param defaults the default value if the index is overrun default Optional.absent
     */
    getAsElem(index: number, defaults: Optional<any>): IOptional<Element>;

    /**
     * returns the value array< of all elements
     */
    allElems(): Array<Element>;

    /**
     * absent no values reached?
     */
    isAbsent(): boolean;

    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active dopmquery object
     */
    isPresent(presentRunnable ?: (elem ?: IDomQuery) => void): boolean;

    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active dopmquery object
     *
     *
     * @param presentRunnable
     */
    ifPresentLazy(presentRunnable: (elem ?: IDomQuery) => void): IDomQuery;

    /**
     * remove all affected nodes from this query object from the dom tree
     */
    delete(): void;

    /**
     * query selector all on the existing dom query object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    querySelectorAll(selector): IDomQuery;

    /**
     * core byId method
     * @param id the id to search for
     * @param includeRoot also match the root element?
     */
    byId(id: string, includeRoot?: boolean): IDomQuery;

    /**
     * same as byId just for the tag name
     * @param tagName
     * @param includeRoot
     */
    byTagName(tagName: string, includeRoot ?: boolean): IDomQuery;

    /**
     * attr accessor, usage myQuery.attr("class").value = "bla"
     * or let value myQuery.attr("class").value
     * @param attr the attribute to set
     * @param defaultValue the default value in case nothing is presented (defaults to null)
     */
    attr(attr: string, defaultValue: string): IElementAttribute;

    /**
     * hasclass, checks for an existing class in the class attributes
     *
     * @param clazz the class to search for
     */
    hasClass(clazz: string): boolean;

    /**
     * appends a class string if not already in the element(s)
     *
     * @param clazz the style class to append
     */
    addClass(clazz: string): IDomQuery;

    /**
     * remove the style class if in the class definitions
     *
     * @param clazz
     */
    removeClass(clazz: string): IDomQuery;

    /**
     * checks whether we have a multipart element in our children
     */
    isMultipartCandidate(): boolean;

    /**
     * innerHtml equivalkent
     * equivalent to jqueries html
     * as setter the html is set and the
     * DomQuery is given back
     * as getter the html string is returned
     *
     * @param inval
     */
    html(inval?: string): IDomQuery | IOptional<string>;

    /**
     * easy node traversal, you can pass
     * a set of node selectors which are joined as direct childs
     *
     * not the rootnodes are not in the getIf, those are always the child nodes
     *
     * @param nodeSelector
     */
    getIf(...nodeSelector: Array<string>): IDomQuery;

    /**
     * iterate over each element and perform something on the element
     * (Dom element is passed instead of IDomQuery)
     * @param func
     */
    eachElem(func: (item: Element, cnt?: number) => any): IDomQuery;

    /**
     * perform an operation on the first element
     * returns a IDomQuery on the first element only
     * @param func
     */
    firstElem(func: (item: Element, cnt?: number) => any): IDomQuery;

    /**
     * same as eachElem, but a IDomQuery object is passed down
     *
     * @param func
     */
    each(func: (item: IDomQuery, cnt?: number) => any): IDomQuery;

    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    first(func: (item: IDomQuery, cnt?: number) => any): IDomQuery;

    /**
     * filter function which filters a subset
     *
     * @param func
     */
    filter(func: (item: IDomQuery) => boolean): IDomQuery;

    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaled
     * @param  nonce optional  nonce key for higher security
     */
    globalEval(code: string, nonce ?: string): IDomQuery;

    /**
     * detaches a set of nodes from their parent elements
     * in a browser independend manner
     * @param {Object} items the items which need to be detached
     * @return {Array} an array of nodes with the detached dom nodes
     */
    detach(): IDomQuery;

    /**
     * appends the current set of elements
     * to the element or first element passed via elem
     * @param elem
     */
    appendTo(elem: IDomQuery): void;

    /**
     * loads and evals a script from a source uri
     *
     * @param src the source to be loaded and evaled
     * @param defer in miliseconds execution default (0 == no defer)
     * @param charSet
     */
    loadScriptEval(src: string, defer: number, charSet: string): void;

    /**
     * insert toInsert after the current element
     *
     * @param toInsert an array of IDomQuery objects
     */
    insertAfter(...toInsert: Array<DomQuery>): IDomQuery;

    /**
     * inserts the elements before the current element
     *
     * @param toInsert
     */
    insertBefore(...toInsert: Array<DomQuery>): IDomQuery;

    /**
     * in case the IDomQuery is pointing to nothing the else value is taken into consideration
     * als alternative
     *
     * @param elseValue the else value
     */
    orElse(...elseValue: any): IDomQuery;

    /**
     * the same with lazy evaluation for cases where getting the else value
     * is a heavy operation
     *
     * @param func the else provider function
     */
    orElseLazy(func: () => any): IDomQuery;

    /**
     * all parents with TagName
     * @param tagName
     */
    parents(tagName: string): IDomQuery;

    /**
     * copy all attributes of sourceItem to this IDomQuery items
     *
     * @param sourceItem the source item to copy over (can be another IDomQuery or a parsed XML Query item)
     */
    copyAttrs(sourceItem: IDomQuery | XMLQuery): IDomQuery;

    /**
     * outerhtml convenience method
     * browsers only support innerHTML but
     * for instance for your jsf.js we have a full
     * replace pattern which needs outerHTML processing
     *
     * @param markup
     * @param runEmbeddedScripts
     * @param runEmbeddedCss
     */
    outerHTML(markup: string, runEmbeddedScripts ?: boolean, runEmbeddedCss ?: boolean): IDomQuery;

    /**
     * Run through the given nodes in the IDomQuery execute the inline scripts
     * @param whilteListed: optional whitelist function which can filter out script tags which are not processed
     * defaults to the standard jsf.js exclusion (we use this code for myfaces)
     */
    runScripts(whilteListed: (val: string) => boolean): IDomQuery;

    /**
     * runs the embedded css
     */
    runCss(): IDomQuery;

    /**
     * fires a click event on the underlying dom elements
     */
    click(): IDomQuery;

    /**
     * adds an event listener
     *
     * @param type
     * @param listener
     * @param options
     */
    addEventListener(type: string, listener: (evt: Event) => void, options?: boolean | EventListenerOptions): IDomQuery;

    /**
     * removes an event listener
     *
     * @param type
     * @param listener
     * @param options
     */
    removeEventListener(type: string, listener: (evt: Event) => void, options?: boolean | EventListenerOptions): IDomQuery;

    /**
     * fires an event
     */
    fireEvent(eventName: string): void;

    /*
     * pushes  in optionally a new textContent, and/or returns the current text content
     */
    textContent(joinstr?: string): string;

    /*
     * pushes  in optionally a new innerText, and/or returns the current innerText
     */
    innerText(joinstr?: string): string;

    /**
     * encodes all input elements properly into respective
     * config entries, this can be used
     * for legacy systems, for newer usecases, use the
     * HTML5 Form class which all newer browsers provide
     *
     * @param toMerge optional config which can be merged in
     * @return a copy pf
     */
    encodeFormElement(toMerge?: IConfig | {[key: string]: any}): IConfig | {[key: string]: any};

    /**
     * fetches the subnodes from ... to..
     * @param from
     * @param to
     */
    subNodes(from: number, to?: number): IDomQuery;
}