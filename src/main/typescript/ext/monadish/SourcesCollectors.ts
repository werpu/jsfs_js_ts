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

/**
 * an intermediate data source wich prefilters
 * incoming stream data
 * and lets only the data out which
 * passes the filter function check
 */
export class FilteredStreamDatasource<T> implements IStreamDataSource<T> {

    filterFunc: (T) => boolean;
    inputDataSource: IStreamDataSource<T>;

    filteredNext: T = null;

    constructor(filterFunc: (T) => boolean, parent: IStreamDataSource<T>) {
        this.filterFunc = filterFunc;
        this.inputDataSource = parent;
    }

    /**
     * in order to filter we have to make a look ahead until the
     * first next allowed element
     * hence we prefetch the element and then
     * serve it via next
     */
    hasNext(): boolean {
        while (this.filteredNext == null && this.inputDataSource.hasNext()) {
            let next: T = <T>this.inputDataSource.next();
            if (this.filterFunc(next)) {
                this.filteredNext = next;
                return true;
            } else {
                this.filteredNext = null;
            }
        }
        return this.filteredNext != null;

    }

    /**
     * serve the next element
     */
    next(): T {
        let ret = this.filteredNext;
        this.filteredNext = null;
        //We have to call hasNext, to roll another
        //prefetch in case someone runs next
        //sequentially without calling hasNext
        this.hasNext();
        return ret;
    }

    reset(): void {
        this.filteredNext = null;
        this.inputDataSource.reset();
    }
}

/**
 * an intermediate datasource which maps the items from
 * one into another
 */
export class MappedStreamDataSource<T, S> implements IStreamDataSource<S> {

    mapFunc: (T) => S;
    inputDataSource: IStreamDataSource<T>;

    constructor(mapFunc: (T) => S, parent: IStreamDataSource<T>) {
        this.mapFunc = mapFunc;
        this.inputDataSource = parent;
    }

    hasNext(): boolean {
        return this.inputDataSource.hasNext();
    }

    next(): S {
        return this.mapFunc(this.inputDataSource.next());
    }

    reset(): void {
        this.inputDataSource.reset();
    }
}

/**
 * Same for flatmap to deal with element -> stream mappings
 */
export class FlatMapStreamDataSource<T, S> implements IStreamDataSource<S> {

    mapFunc: StreamMapper<T>;

    inputDataSource: IStreamDataSource<T>;

    /**
     * the currently active stream
     * coming from an incoming element
     * once the end of this one is reached
     * it is swapped out by another one
     * from the next element
     */
    activeDataSource: IStreamDataSource<S>;

    constructor(func: StreamMapper<T>, parent: IStreamDataSource<T>) {
        this.mapFunc = func;
        this.inputDataSource = parent;
    }

    hasNext(): boolean {
        return this.resolveCurrentNext() || this.resolveNextNext();
    }

    private resolveCurrentNext() {
        let next = false;
        if (this.activeDataSource) {
            next = this.activeDataSource.hasNext();
        }
        return next;
    }

    private resolveNextNext() {
        let next = false;
        while (!next && this.inputDataSource.hasNext()) {
            let mapped =  this.mapFunc(this.inputDataSource.next());
            if(Array.isArray(mapped)) {
                this.activeDataSource = new ArrayStreamDataSource(...mapped);
            } else {
                this.activeDataSource = mapped;
            }
            next = this.activeDataSource.hasNext();
        }
        return next;
    }

    next(): S {
        return this.activeDataSource.next();
    }

    reset(): void {
        this.inputDataSource.reset();
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
 * Form data collector for key value pair streams
 */
export class FormDataCollector implements ICollector<{ key: string, value: any }, FormData> {
    finalValue: FormData = new FormData();

    collect(element: { key: string; value: any }) {
        this.finalValue.append(element.key, element.value);
    }
}

/**
 * Form data collector for DomQuery streams
 */
export class QueryFormDataCollector implements ICollector<DomQuery, FormData> {
    finalValue: FormData = new FormData();

    collect(element: DomQuery) {
        let toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.finalValue.append(element.name.value, toMerge.get(element.name).value);
        }
    }
}

/**
 * Encoded String collector from dom query streams
 */
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