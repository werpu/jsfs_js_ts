import {AsyncRunnable} from "./AsyncRunnable";
import {ExtLang} from "./Lang";
import debounce = ExtLang.debounce;

/**
 * A simple XHR queue controller
 * following the async op -> next pattern
 * Faces enforces for the XHR handling
 */
export class XhrQueueController<T extends AsyncRunnable<any>> {
    queue = [];
    taskRunning = false;

    constructor() {}

    /**
     * executes or enqueues an element
     * @param runnable the runnable (request) to be enqueued
     * @param timeOut timeout if > 0 which defers the execution
     * until the debounce window for the timeout is closed.
     */
    enqueue(runnable: T, timeOut: number = 0) {
        debounce("xhrQueue",() => {
            const requestHandler = this.enrichRunnable(runnable);
            if (!this.taskRunning) {
                this.signalTaskRunning();
                requestHandler.start();
            } else {
                this.queue.push(requestHandler);
            }
        }, timeOut);
    }

    /**
     * trigger the next element in the queue
     * to be started!
     */
    next() {
        const next = this.queue.shift();
        this.taskRunning = !this.isEmpty;
        next?.start();
    }

    /**
     * clears and resets the queue
     */
    clear() {
        this.queue.length = 0;
        this.taskRunning = false;
    }

    /**
     * true if queue is empty
     */
    get isEmpty(): boolean {
        return !this.queue.length;
    }

    /**
     * Enriches the incoming async asyncRunnable
     * with the error and next handling
     * (aka: asyncRunnable is done -> next
     *                   error -> clear queue
     * @param asyncRunnable the async runnable which needs enrichment
     * @private
     */
    private enrichRunnable(asyncRunnable: T) {
        return asyncRunnable
            .then(() => this.next())
            .catch((e) => {
                this.clear();
                throw e;
            });
    }

    /**
     * alerts the queue that a task is running
     *
     * @private
     */
    private signalTaskRunning() {
        this.taskRunning = true;
    }
}