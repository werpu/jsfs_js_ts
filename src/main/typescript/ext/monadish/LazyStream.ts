/*
 * A small stream implementation, at the moment still early evaluation but i will go for a lazy pattern in the long
 * run to allow infinite data sources
 */
import {IMonad, Optional} from "./Monad";
import {ArrayCollector, ICollector, IStream} from "./Stream";

/**
 * Iterateable for stream
 */
interface IStreamDataSource<T> {

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
 * implementation of iteratable on top of array
 */
class ArrayStreamDataSource<T> implements IStreamDataSource<T> {
    value: Array<T>;
    dataPos = -1;

    constructor(...value: Array<T>) {
        this.value = value;
    }

    hasNext(): boolean {
        return this.value.length - 1 > this.dataPos;
    }

    next(): T {
        this.dataPos++;
        return this.value[this.dataPos];
    }

    reset() {
        this.dataPos = -1;
    }
}

class FilteredStreamDatasource<T> implements IStreamDataSource<T> {

    filterFunc: (T) => boolean;
    parent: IStreamDataSource<T>;

    filteredNext: T = null;

    constructor(filterFunc: (T) => boolean, parent: IStreamDataSource<T>) {
        this.filterFunc = filterFunc;
        this.parent = parent;
    }

    hasNext(): boolean {
        while (this.filteredNext == null && this.parent.hasNext()) {
            let next: T = <T>this.parent.next();
            if (this.filterFunc(next)) {
                this.filteredNext = next;
                return true;
            } else {
                this.filteredNext = null;
            }
        }
        return this.filteredNext != null;

    }

    next(): T {
        let ret = this.filteredNext;
        this.filteredNext = null;
        return ret;
    }

    reset(): void {
        this.filteredNext = null;
        this.parent.reset();
    }
}

class MappedStreamDataSource<T, S> implements IStreamDataSource<S> {

    mapFunc: (T) => S;
    parent: IStreamDataSource<T>;

    constructor(filterFunc: (T) => S, parent: IStreamDataSource<T>) {
        this.mapFunc = filterFunc;
        this.parent = parent;
    }

    hasNext(): boolean {
        return this.parent.hasNext();
    }

    next(): S {
        return this.mapFunc(this.parent.next());
    }

    reset(): void {
        this.parent.reset();
    }
}


class FlatMapStreamDataSource<T, S> implements IStreamDataSource<S> {

    mapFunc: (T) => IStreamDataSource<S>;
    parent: IStreamDataSource<T>;

    activeOne: IStreamDataSource<S>;

    constructor(func: (T) => IStreamDataSource<S>, parent: IStreamDataSource<T>) {
        this.mapFunc = func;
        this.parent = parent;
    }

    hasNext(): boolean {
        let next = false;
        if (this.activeOne) {
            next = this.activeOne.hasNext();
        }
        while (!next && this.parent.hasNext()) {
            this.activeOne = this.mapFunc(this.parent.next());
            next = this.activeOne.hasNext();
        }
        return next;
    }

    next(): S {
        return this.activeOne.next();
    }

    reset(): void {
        this.parent.reset();
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

    constructor(parent) {
        this.parent = parent;

    }

    hasNext(): boolean {
        if (this._limits != -1 && this.pos >= this._limits - 1) {
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

    nextFilter(fn: (T) => boolean): T {
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

    onElem(fn: (data: T, pos ?: number) => boolean | void): LazyStream<T> {
        return new LazyStream(new MappedStreamDataSource((el) => {
            if(fn(el, this.pos) === false) {
                this.stop();
            }
            return el;
        }, this));
    }

    filter(fn: (data: T) => boolean): LazyStream<T> {
        return new LazyStream(new FilteredStreamDatasource(fn, this));
    }

    map<R>(fn: (data: T) => any): LazyStream<any> {
        return new LazyStream(new MappedStreamDataSource(fn, this));
    }

    //r must extend IStreamDataSource
    flatMap<R>(fn: (data: T) => R): LazyStream<any> {
        return new LazyStream<any>(new FlatMapStreamDataSource(<any>fn, this));
    }

    //endpoint
    each(fn: (T) => void | boolean) {
        while (this.hasNext()) {
            if (fn(this.next()) === false) {
                this.stop();
            }
        }
    }

    reduce(fn: (val1: T, val2: T) => T, startVal: T = null): Optional<T> {
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

    anyMatch(fn: (data: T) => boolean): boolean {
        while (this.hasNext()) {
            if (fn(this.next())) {
                return true;
            }
        }
        return false;
    }

    allMatch(fn: (data: T) => boolean): boolean {
        while (this.hasNext()) {
            if (!fn(this.next())) {
                return false;
            }
        }
        return true;
    }

    noneMatch(fn: (data: T) => boolean): boolean {
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


}


