/*
 * A small stream implementation
 */
import {IMonad, IValueHolder, Optional} from "./Monad";
import {
    ArrayCollector,
    ArrayStreamDataSource,
    FilteredStreamDatasource, FlatMapStreamDataSource,
    ICollector,
    IStreamDataSource,
    MappedStreamDataSource
} from "./SourcesCollectors";


export type StreamMapper<T> = (data: T) => IStreamDataSource<any>;
export type IteratableConsumer<T> = (data: T, pos ?: number) => void | boolean;
export type Reducable<T> = (val1: T, val2: T) => T;
export type Matchable<T> = (data: T) => boolean;
export type Mappable<T,R> = (data: T) => R;



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
    flatMap<R>(fn?: StreamMapper<T>): IStream<R>;

    /**
     * filtering, takes an element in and is processed by fn.
     * If it returns false then further processing on this element is skipped
     * if it returns true it is passed down the chain.
     *
     * @param fn
     */
    filter(fn?:  Matchable<T>): IStream<T>;

    /**
     * functional reduce... takes two elements in the stream and reduces to
     * one from left to right
     *
     * @param fn the reduction function for instance (val1,val2) => val1l+val2
     * @param startVal an optional starting value, if provided the the processing starts with this element
     * and further goes down into the stream, if not, then the first two elements are taken as reduction starting point
     */
    reduce(fn: Reducable<T>, startVal: T): Optional<T>;

    /**
     * returns the first element in the stream is given as Optional
     */
    first(): Optional<T>;

    /**
     * Returns the last stream element (note in endless streams without filtering and limiting you will never reach that
     * point hence producing an endless loop)
     */
    last(): Optional<T>;

    /**
     * returns true if there is at least one element where a call fn(element) produces true
     *
     * @param fn
     */
    anyMatch(fn:  Matchable<T>): boolean;

    /**
     * returns true if all elmements produce true on a call to fn(element)
     *
     * @param fn
     */
    allMatch(fn:  Matchable<T>): boolean;

    /**
     * returns true if no elmements produce true on a call to fn(element)
     *
     * @param fn
     */
    noneMatch(fn:  Matchable<T>): boolean;

    /**
     * Collect the elements with a collector given
     * There are a number of collectors provided
     *
     * @param collector
     */
    collect(collector: ICollector<T, any>): any;

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

/**
 * A simple typescript based reimplementation of streams
 *
 * This is the early eval version
 * for a lazy eval version check, LazyStream, which is api compatible
 * to this implementation, however with the benefit of being able
 * to provide infinite data sources and generic data providers
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

    flatMap<IStreamDataSource>(fn: (data: T) => IStreamDataSource): Stream<any> {
        let ret = [];
        this.each(item => {
            let strmR: any = fn(item);
            ret = ret.concat(...strmR.value);
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

    reduce(fn: Reducable<T>, startVal: T = null): Optional<T> {
        let offset = startVal != null ? 0 : 1;
        let val1 = startVal != null ? startVal : this.value.length ? this.value[0] : null;

        for (let cnt = offset; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            val1 = fn(val1, this.value[cnt]);
        }
        return Optional.fromNullable(val1);
    }

    first(): Optional<T> {
        return this.value && this.value.length ? Optional.fromNullable(this.value[0]) : Optional.absent;
    }

    last(): Optional<T> {
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

    allMatch(fn:  Matchable<T>): boolean {
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

    noneMatch(fn:  Matchable<T>): boolean {
        let matches = 0;
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (!fn(this.value[cnt])) {
                matches++;
            }
        }
        return matches == this.value.length;
    }

    collect(collector: ICollector<T, any>): any {
        this.each(data => collector.collect(data));
        return collector.finalValue;
    }

    //-- internally exposed methods needed for the interconnectivity
    hasNext() {
        let isLimitsReached = this._limits != -1 && this.pos >= this._limits - 1;
        let isEndOfArray = this.pos >= this.value.length - 1;
        return !(isLimitsReached ||
            isEndOfArray);
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
 * with reverse referencing
 * and for special operations like filtering
 * flatmapping have intermediate datasources in the list
 * with specialized functions.
 *
 * That way we can have a lazy evaluating stream
 *
 * So on the endpoints side, every call to get an element
 * triggers a chain of operations to the parents with then
 * perform a set of monadic operations until the data hits
 * the endpoint
 */
export class LazyStream<T> implements IStreamDataSource<T>, IStream<T>, IMonad<T, LazyStream<any>> {

    protected parent: IStreamDataSource<T>;

    pos = -1;
    _limits = -1;

    static of<T>(...values: Array<T>): LazyStream<T> {
        return new LazyStream<T>(new ArrayStreamDataSource(...values));
    }

    static ofStreamDataSource<T>(value: IStreamDataSource<T>): LazyStream<T> {
        return new LazyStream(value);
    }

    constructor(parent: IStreamDataSource<T>) {
        this.parent = parent;

    }

    hasNext(): boolean {
        if (this.isOverLimits()) {
            return false;
        }

        return this.parent.hasNext();
    }

    next(): T {
        let next = this.parent.next();
        // @ts-ignore
        this.pos++;
        return next;
    }

    reset(): void {
        this.parent.reset();
        this.pos = 0;
        this._limits = -1;
    }

    nextFilter(fn:  Matchable<T>): T {
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
            if(fn(el, this.pos) === false) {
                this.stop();
            }
            return el;
        }, this));
    }

    filter(fn:  Matchable<T>): LazyStream<T> {
        return <LazyStream<T>> new LazyStream<T>(new FilteredStreamDatasource<any>(fn, this));
    }

    map<R>(fn:  Mappable<T, R>): LazyStream<any> {
        return new LazyStream(new MappedStreamDataSource(fn, this));
    }


    flatMap<StreamProducer>(fn: StreamProducer): LazyStream<any> {
        return new LazyStream<any>(new FlatMapStreamDataSource(<any>fn, this));
    }

    //endpoint
    each(fn:  IteratableConsumer<T>) {
        while (this.hasNext()) {
            if (fn(this.next()) === false) {
                this.stop();
            }
        }
    }

    reduce(fn: Reducable<T>, startVal: T = null): Optional<T> {
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

    last(): Optional<T> {
        if (!this.hasNext()) {
            return Optional.absent;
        }
        return this.reduce((el1, el2) => el2);
    }

    first(): Optional<T> {
        this.reset();
        if (!this.hasNext()) {
            return Optional.absent;
        }
        return Optional.fromNullable(this.next());
    }

    anyMatch(fn:  Matchable<T>): boolean {
        while (this.hasNext()) {
            if (fn(this.next())) {
                return true;
            }
        }
        return false;
    }

    allMatch(fn:  Matchable<T>): boolean {
        while (this.hasNext()) {
            if (!fn(this.next())) {
                return false;
            }
        }
        return true;
    }

    noneMatch(fn:  Matchable<T>): boolean {
        while (this.hasNext()) {
            if (fn(this.next())) {
                return false;
            }
        }
        return true;
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


