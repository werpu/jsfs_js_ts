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

import {AsyncRunnable} from "./AsyncRunnable";
import {Lang} from "./Lang";

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

/**
 * we use the dom to decouple the next processing
 * from the calls,
 *
 * that way we do not have any recursive calls within out async
 * queue.
 *
 * we use a shadow dom div as event dispatching element
 * we cannot use the full shadow dom facilities
 * due to ie11 but we at least can use a non attached div.
 *
 */
class DomEventDispatcher {

    listeners: any = [];
    shadowElement: HTMLElement;

    constructor() {
        this.shadowElement = document.createElement("div");
    }

    addEventListener(theName: string, listener: (Event) => void) {
        this.listeners.push(listener);
        this.shadowElement.addEventListener(theName, listener, {
            capture: true
        });
    }

    removeEventListener(theName: string, listener?: (Event) => void) {
        if (listener) {
            this.shadowElement.removeEventListener(theName, listener, {
                capture: true
            });
            this.listeners = Lang.instance.arrFilter(this.listeners, (item) => item != listener);
        } else {
            for (let currListener of this.listeners) {
                this.shadowElement.removeEventListener(theName, currListener, {
                    capture: true
                });
            }
            this.listeners = [];
        }
    }

    dispatchEvent(theName, data: EventInit = {
        bubbles: false,
        cancelable: true,
        composed: false
    }) {
        this.shadowElement.dispatchEvent(new Event(theName, data))
    }
}

/**
 * Asynchronous queue which starts to work
 * through the callbacks until the queue is empty
 *
 * Every callback must be of async runnable
 * which is sort of an extended promise which has
 * added a decicated cancel and start point
 *
 * This interface can be used as wrapper contract
 * for normal promises if needed.
 */
export class AsynchronouseQueue<T extends AsyncRunnable<any>> {
    static EVT_NEXT = "__mf_queue_next__";

    private runnableQueue = new Queue<T>();
    private delayTimeout: number;
    private eventDispatcher = new DomEventDispatcher();

    currentlyRunning: AsyncRunnable<any>;

    constructor() {
        //only one Async queue allowed for now!!!!
        this.eventDispatcher.addEventListener(AsynchronouseQueue.EVT_NEXT, () => {
            this.processNextElement();
        })
    }

    get isEmpty(): boolean {
        return this.runnableQueue.isEmpty;
    }

    // noinspection JSUnusedLocalSymbols
    private set queueSize(newSize: number) {
        this.runnableQueue.queueSize = newSize;
    }

    /**
     * enequeues an element and starts the
     * asynchronous work loop if not already running
     *
     * @param element the element to be queued and processed
     * @param delay possible delay after our usual process or drop if something newer is incoming algorithm
     */
    enqueue(element: T, delay = 0) {
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
            this.delayTimeout = null;
        }
        if (delay) {
            this.delayTimeout = setTimeout(() => {
                this.appendElement(element);
            });
        } else {
            this.appendElement(element);
        }
    }

    dequeue(): T {
        return this.runnableQueue.dequeue();
    }

    read(): T {
        return this.runnableQueue.read();
    }

    cleanup() {
        this.currentlyRunning = null;
        this.runnableQueue.cleanup();
    }

    private appendElement(element: T) {
        //only if the first element is added we start with a trigger
        //otherwise a process already is running and not finished yet at that
        //time
        this.runnableQueue.enqueue(element);
        if (this.runnableQueue.length === 1) {
            this.runEntry();
        }
    }

    private runEntry() {
        if (this.isEmpty) {
            return;
        }
        let element = this.read();
        element
            .catch((e) => {
                //in case of an error we always clean up the remaining calls
                //to allow a clean recovery of the application
                this.cleanup();
                throw e;
            })
            .then(
                //the idea is to trigger the next over an event to reduce
                //the number of recursive calls (stacks might be limited
                //compared to ram)
                //naturally give we have a DOM, the DOM is the natural event dispatch system
                //which we can use, to decouple the calls from a recursive stack call
                //(the browser engine will take care of that)
                () => this.callForNextElementToProcess()
            ).start();
    }

    cancel() {
        if (this.currentlyRunning) {
            this.currentlyRunning.cancel();
            this.currentlyRunning = null;
        }
        this.cleanup();
    }

    private callForNextElementToProcess() {
        this.currentlyRunning = null;
        this.eventDispatcher.dispatchEvent(AsynchronouseQueue.EVT_NEXT);
    }

    private processNextElement() {
        this.runnableQueue.dequeue();
        if (!this.isEmpty) {
            this.runEntry();
        }
    }

}