import {Stream, StreamMapper} from "./Stream";
import {DomQuery} from "./DomQuery";


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
 * implementation of iteratable on top of array
 */
export class ArrayStreamDataSource<T> implements IStreamDataSource<T> {
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

export class FilteredStreamDatasource<T> implements IStreamDataSource<T> {

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

export class MappedStreamDataSource<T, S> implements IStreamDataSource<S> {

    mapFunc: (T) => S;
    parent: IStreamDataSource<T>;

    constructor(mapFunc: (T) => S, parent: IStreamDataSource<T>) {
        this.mapFunc = mapFunc;
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


export class FlatMapStreamDataSource<T, S> implements IStreamDataSource<S> {

    mapFunc: StreamMapper<T>;
    parent: IStreamDataSource<T>;

    activeOne: IStreamDataSource<S>;

    constructor(func: StreamMapper<T>, parent: IStreamDataSource<T>) {
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
 * For the time being we only need one collector
 * a collector which collects a stream back into arrays
 */
export class ArrayCollector<S> implements ICollector<S, Array<S>> {
    private data: Array<S> = [];

    collect(element: S) {
        this.data.push(element);
    }

    get finalValue(): Array<S> {
        return this.data;
    }
}


/**
 * Helper form data collector
 */
export class FormDataCollector implements ICollector<{ key: string, value: any }, FormData> {
    finalValue: FormData = new FormData();

    collect(element: { key: string; value: any }) {
        this.finalValue.append(element.key, element.value);
    }
}

export class QueryFormDataCollector implements ICollector<DomQuery, FormData> {
    finalValue: FormData = new FormData();

    collect(element: DomQuery) {
        let toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.finalValue.append(element.name.value, toMerge.get(element.name).value);
        }
    }
}

export class QueryFormStringCollector implements ICollector<DomQuery, string> {

    formData: [[string, string]] = <any>[];

    collect(element: DomQuery) {
        let toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.formData.push([element.name.value, toMerge.get(element.name).value]);
        }
    }

    get finalValue(): string {
        return Stream.of(...this.formData)
            .map<string>(keyVal => keyVal.join("="))
            .reduce((item1, item2) => [item1, item2].join("&"))
            .orElse("").value;
    }
}