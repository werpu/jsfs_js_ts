
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
 * A simple typescript based reimplementation of streams
 *
 * For the time being streams are early evaluated
 * will be removed to lazy streams soon as I have time to work on them
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

    collect(collector: ICollector<T, any>): any {
        this.each(data => collector.collect(data));
        return collector.finalValue;
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