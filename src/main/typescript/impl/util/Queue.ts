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
 * classical queue implementation
 * but with a high speed mix to
 * process the queue as fast as possible
 */
export class Queue<T> {
    //faster queue by http://safalra.com/web-design/javascript/queues/Queue.js
    //license public domain
    //The trick is to simply reduce the number of slice and slice ops to a bare minimum.

    private q: any = [];
    private space: number = 0;
    private size: number = -1;

    constructor() {
    }

    /**
     * @return the length of the queue as integer
     */
    get length(): number {
        return this.q.length - this.space;
    }

    /**
     * @return true if the current queue is empty false otherwise
     */
    get isEmpty(): boolean {
        // return true if the queue is empty, and false otherwise
        return (this.q.length == 0);
    }

    /**
     * Sets the current queue to a new size, all overflow elements at the end are stripped
     * automatically
     *
     * @param {int} newSize as numeric value
     */
    set queueSize(newSize: number) {
        this.size = newSize;
        this.readjust();
    }

    /**
     * adds a listener to the queue
     *
     * @param element the listener to be added
     */
    enqueue(element: T) {
        this.q.push(element);
        //qeuesize is bigger than the limit we drop one element so that we are
        //back in line
        this.readjust();
    }

    /**
     * removes a listener form the queue
     *
     * @param element the listener to be removed
     */
    remove(element: T) {
        /*find element in queue*/
        let index = this.indexOf(element);
        /*found*/
        if (index >= 0) {
            this.q.splice(index, 1);
        }
    }

    /**
     * dequeues the last element in the queue
     * @return {Object} element which is dequeued
     */
    dequeue(): T {
        // initialise the element to return to be undefined
        let element = null;

        // check whether the queue is empty
        let qLen = this.q.length;
        let queue: any = this.q;

        if (qLen) {
            // fetch the oldest element in the queue
            element = queue[this.space];
            // update the amount of space and check whether a shift should occur
            //added here a max limit of 30
            //now bit shift left is a tad faster than multiplication on most vms and does the same
            //unless we run into a bit skipping which is impossible in our usecases here
            if ((++this.space) << 1 >= qLen) {

                // set the queue equal to the non-empty portion of the queue
                this.q = queue.slice(this.space);

                // reset the amount of space at the front of the queue
                this.space = 0;
            }
        }
        // return the removed element
        return element;
    }

    read(): T {

        // check whether the queue is empty
        let element = null,
            qLen = this.q.length,
            queue: any = this.q;

        if (qLen) {
            // fetch the oldest element in the queue
            element = queue[this.space];
        }
        return element;
    }

    each(callbackfn: (value: T, index: number, array: T[]) => void) {
        this.q.forEach(callbackfn);
    }

    arrFilter(callbackfn: (value: T, index: number, array: T[]) => boolean) {
        return this.q.filter(callbackfn);
    }

    /**
     * @param element
     * @return the current index of the element in the queue or -1 if it is not found
     */
    indexOf(element: T) {
        return this.q.indexOf(element);
    }

    /**
     * resets the queue to initial empty state
     */
    cleanup() {
        this.q = [];
        this.space = 0;
    }

    private readjust() {
        let size = this.size;
        while (size && size > -1 && this.length > size) {
            this.dequeue();
        }
    }
}
