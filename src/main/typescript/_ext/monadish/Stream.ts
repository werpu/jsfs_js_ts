/*
 * A small stream implementation
 */
import {IMonad, IValueHolder, Optional} from "./Monad";

/**
 * A collector, needs to be implemented
 */
export interface ICollector<T,S> {
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
    onElem(fn: (data: T, pos ?: number) => void | boolean): IStream<T>;

    /**
     * Iterate over all elements in the stream and do some processing via fn
     *
     * @param fn takes a single element and if it returns false
     * then further processing is stopped
     */
    each(fn: (data: T, pos ?: number) => void | boolean): void;

    /**
     * maps a single element into another via fn
     * @param fn function which takes one element in and returns another
     */
    map<R>(fn?: (data: T) => R): IStream<R>;

    /**
     * Takes an element in and returns a set of something
     * the set then is flatted into a single stream to be further processed
     *
     * @param fn
     */
    flatMap<R>(fn?: (data: T) => IStream<R>): IStream<any>;

    /**
     * filtering, takes an element in and is processed by fn.
     * If it returns false then further processing on this element is skipped
     * if it returns true it is passed down the chain.
     *
     * @param fn
     */
    filter(fn?: (data: T) => boolean): IStream<T>;

    /**
     * functional reduce... takes two elements in the stream and reduces to
     * one from left to right
     *
     * @param fn the reduction function for instance (val1,val2) => val1l+val2
     * @param startVal an optional starting value, if provided the the processing starts with this element
     * and further goes down into the stream, if not, then the first two elements are taken as reduction starting point
     */
    reduce(fn: (val1: T, val2: T) => T, startVal: T): Optional<T>;

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
    anyMatch(fn: (data: T) => boolean): boolean;

    /**
     * returns true if all elmements produce true on a call to fn(element)
     *
     * @param fn
     */
    allMatch(fn: (data: T) => boolean): boolean;

    /**
     * returns true if no elmements produce true on a call to fn(element)
     *
     * @param fn
     */
    noneMatch(fn: (data: T) => boolean): boolean;

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

    limits(end: number): Stream<T> {
        this._limits = end;
        return this;
    }

    onElem(fn: (data: T, pos ?: number) => void | boolean): Stream<T> {
        for (let cnt = 0; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
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

    flatMap<R>(fn: (data: T) => R): Stream<any> {
        let ret = [];
        this.each( item => {
            let strmR: any = fn(item);
            ret = ret.concat(... strmR.value);
        });
        return <Stream<any>> Stream.of(... ret);
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

        for (let cnt = offset; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
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

    anyMatch(fn: (data: T) => boolean): boolean {
        for (let cnt = 0; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
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

    next():T {
        if(!this.hasNext()) {
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
 * For the time being we only need one collector
 * a collector which collects a stream back into arrays
 */
export class ArrayCollector<S> implements ICollector<S, Array<S>>{
    private data: Array<S> = [];

    collect(element: S) {
        this.data.push(element);
    }

    get finalValue(): Array<S> {
        return this.data;
    }
}