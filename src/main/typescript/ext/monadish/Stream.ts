/*
 * A small stream implementation
 */
import {Optional} from "./Monad";
import {
    ArrayCollector,
    ArrayStreamDataSource,
    FilteredStreamDatasource, FlatMapStreamDataSource,
    MappedStreamDataSource
} from "./SourcesCollectors";
import {
    IMonad, IValueHolder, ICollector,
    IStreamDataSource, IOptional, IStream,
} from "./Types";

/*
 * some typedefs to make the code more reabable
 */
export type StreamMapper<T> = (data: T) => IStreamDataSource<any>;
export type ArrayMapper<T> = (data: T) => Array<any>;
export type IteratableConsumer<T> = (data: T, pos ?: number) => void | boolean;
export type Reducable<T> = (val1: T, val2: T) => T;
export type Matchable<T> = (data: T) => boolean;
export type Mappable<T, R> = (data: T) => R;
export type Comparator<T> = (el1: T, el2: T) => number;



/**
 * A simple typescript based reimplementation of streams
 *
 * This is the early eval version
 * for a lazy eval version check, LazyStream, which is api compatible
 * to this implementation, however with the benefit of being able
 * to provide infinite data sources and generic data providers, the downside
 * is, it might be a tad slower in some situations
 */
export class Stream<T> implements IMonad<T, Stream<any>>, IValueHolder<Array<T>>, IStream<T> {

    value: Array<T>;
    _limits = -1;

    private pos = -1;

    constructor(...value: T[]) {
        this.value = value;
    }

    static of<T>(...data: Array<T>): Stream<T> {
        return new Stream<T>(...data);
    }

    static ofAssoc<T>(data: { [key: string]: T }): Stream<[string, T]> {
        return this.of(...Object.keys(data)).map(key => [key, data[key]]);
    }

    static ofDataSource<T>(dataSource: IStreamDataSource<T>) {
        let value: T[] = [];
        while (dataSource.hasNext()) {
            value.push(dataSource.next());
        }

        return new Stream(...value);
    }

    limits(end: number): Stream<T> {
        this._limits = end;
        return this;
    }

    onElem(fn: (data: T, pos ?: number) => void | boolean): Stream<T> {
        for (let cnt = 0; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            if (fn(this.value[cnt], cnt) === false) {
                break;
            }
        }
        return this;
    }

    each(fn: (data: T, pos ?: number) => void | boolean) {
        this.onElem(fn);
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

    flatMap<IStreamDataSource>(fn: (data: T) => IStreamDataSource | Array<any>): Stream<any> {
        let ret = [];
        this.each(item => {
            let strmR: any = fn(item);
            ret = Array.isArray(strmR) ? ret.concat(strmR) : ret.concat(...strmR.value);
        });
        return <Stream<any>>Stream.of(...ret);
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

    reduce(fn: Reducable<T>, startVal: T = null): IOptional<T> {
        let offset = startVal != null ? 0 : 1;
        let val1 = startVal != null ? startVal : this.value.length ? this.value[0] : null;

        for (let cnt = offset; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            val1 = fn(val1, this.value[cnt]);
        }
        return Optional.fromNullable(val1);
    }

    first(): IOptional<T> {
        return this.value && this.value.length ? Optional.fromNullable(this.value[0]) : Optional.absent;
    }

    last(): IOptional<T> {
        //could be done via reduce, but is faster this way
        let length = this._limits > 0 ? Math.min(this._limits, this.value.length) : this.value.length;

        return Optional.fromNullable(length ? this.value[length - 1] : null);
    }

    anyMatch(fn: Matchable<T>): boolean {
        for (let cnt = 0; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            if (fn(this.value[cnt])) {
                return true;
            }
        }
        return false;
    }

    allMatch(fn: Matchable<T>): boolean {
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

    noneMatch(fn: Matchable<T>): boolean {
        let matches = 0;
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (!fn(this.value[cnt])) {
                matches++;
            }
        }
        return matches == this.value.length;
    }

    sort(comparator: Comparator<T>): IStream<T> {
        let newArr = this.value.slice().sort(comparator);
        return Stream.of(...newArr);
    }

    collect(collector: ICollector<T, any>): any {
        this.each(data => collector.collect(data));
        return collector.finalValue;
    }

    //-- internally exposed methods needed for the interconnectivity
    hasNext() {
        let isLimitsReached = this._limits != -1 && this.pos >= this._limits - 1;
        let isEndOfArray = this.pos >= this.value.length - 1;
        return !(isLimitsReached || isEndOfArray);
    }

    next(): T {
        if (!this.hasNext()) {
            return null;
        }
        this.pos++;
        return this.value[this.pos];
    }

    reset() {
        this.pos = -1;
    }

}

/**
 * Lazy implementation of a Stream
 * The idea is to connect the intermediate
 * streams as datasources like a linked list
 * with reverse referencing and for special
 * operations like filtering flatmapping
 * have intermediate datasources in the list
 * with specialized functions.
 *
 * Sort of a modified pipe valve pattern
 * the streams are the pipes the intermediate
 * data sources are the valves
 *
 * We then can use passed in functions to control
 * the flow in the valves
 *
 * That way we can have a lazy evaluating stream
 *
 * So if an endpoint requests data
 * a callback trace goes back the stream list
 * which triggers an operation upwards
 * which sends data down the drain which then is processed
 * and filtered until one element hits the endpoint.
 *
 * That is repeated, until all elements are processed
 * or an internal limit is hit.
 *
 */
export class LazyStream<T> implements IStreamDataSource<T>, IStream<T>, IMonad<T, LazyStream<any>> {

    protected dataSource: IStreamDataSource<T>;
    _limits = -1;

    /*
     * needed to have the limits check working
     * we need to keep track of the current position
     * in the stream
     */
    pos = -1;

    static of<T>(...values: Array<T>): LazyStream<T> {
        return new LazyStream<T>(new ArrayStreamDataSource(...values));
    }

    static ofAssoc<T>(data: { [key: string]: T }): LazyStream<[string, T]> {
        return this.of(...Object.keys(data)).map(key => [key, data[key]]);
    }

    static ofStreamDataSource<T>(value: IStreamDataSource<T>): LazyStream<T> {
        return new LazyStream(value);
    }

    constructor(parent: IStreamDataSource<T>) {
        this.dataSource = parent;

    }

    hasNext(): boolean {
        if (this.isOverLimits()) {
            return false;
        }

        return this.dataSource.hasNext();
    }

    next(): T {
        let next = this.dataSource.next();
        // @ts-ignore
        this.pos++;
        return next;
    }

    reset(): void {
        this.dataSource.reset();
        this.pos = 0;
        this._limits = -1;
    }

    nextFilter(fn: Matchable<T>): T {
        if (this.hasNext()) {
            let newVal: T = this.next();
            if (!fn(newVal)) {
                return this.nextFilter(fn);
            }
            return <T>newVal;
        }
        return null;
    }

    limits(max: number): LazyStream<T> {
        this._limits = max;
        return this;
    }

    //main stream methods
    collect(collector: ICollector<T, any>): any {
        while (this.hasNext()) {
            let t = this.next();
            collector.collect(<T>t);
        }
        return collector.finalValue;
    }

    onElem(fn: IteratableConsumer<T>): LazyStream<T> {
        return new LazyStream(new MappedStreamDataSource((el) => {
            if (fn(el, this.pos) === false) {
                this.stop();
            }
            return el;
        }, this));
    }

    filter(fn: Matchable<T>): LazyStream<T> {
        return <LazyStream<T>>new LazyStream<T>(new FilteredStreamDatasource<any>(fn, this));
    }

    map<R>(fn: Mappable<T, R>): LazyStream<any> {
        return new LazyStream(new MappedStreamDataSource(fn, this));
    }

    flatMap<StreamMapper>(fn: StreamMapper | ArrayMapper<any>): LazyStream<any> {

        return new LazyStream<any>(new FlatMapStreamDataSource(<any>fn, this));
    }

    //endpoint
    each(fn: IteratableConsumer<T>) {
        while (this.hasNext()) {
            if (fn(this.next()) === false) {
                this.stop();
            }
        }
    }

    reduce(fn: Reducable<T>, startVal: T = null): IOptional<T> {
        if (!this.hasNext()) {
            return Optional.absent;
        }
        let value1 = null;
        let value2 = null;
        if (startVal != null) {
            value1 = startVal;
            value2 = this.next();
        } else {
            value1 = this.next();
            if (!this.hasNext()) {
                return Optional.fromNullable(value1);
            }
            value2 = this.next();
        }
        value1 = fn(value1, value2);
        while (this.hasNext()) {
            value2 = this.next();
            value1 = fn(value1, value2);
        }

        return Optional.fromNullable(value1);
    }

    last(): IOptional<T> {
        if (!this.hasNext()) {
            return Optional.absent;
        }
        return this.reduce((el1, el2) => el2);
    }

    first(): IOptional<T> {
        this.reset();
        if (!this.hasNext()) {
            return Optional.absent;
        }
        return Optional.fromNullable(this.next());
    }

    anyMatch(fn: Matchable<T>): boolean {
        while (this.hasNext()) {
            if (fn(this.next())) {
                return true;
            }
        }
        return false;
    }

    allMatch(fn: Matchable<T>): boolean {
        while (this.hasNext()) {
            if (!fn(this.next())) {
                return false;
            }
        }
        return true;
    }

    noneMatch(fn: Matchable<T>): boolean {
        while (this.hasNext()) {
            if (fn(this.next())) {
                return false;
            }
        }
        return true;
    }

    sort(comparator: Comparator<T>): IStream<T> {
        let arr = this.collect(new ArrayCollector());
        arr = arr.sort(comparator);
        return LazyStream.of(...arr);
    }

    get value(): Array<T> {
        return this.collect(new ArrayCollector<T>());
    }

    private stop() {
        this.pos = this._limits + 1000000000;
    }

    private isOverLimits() {
        return this._limits != -1 && this.pos >= this._limits - 1;
    }

}


