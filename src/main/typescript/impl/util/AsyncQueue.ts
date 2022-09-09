import {AsyncRunnable} from "./AsyncRunnable";

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
export class AsynchronousQueue<T extends AsyncRunnable<any>> {

    private runnableQueue = [];
    private delayTimeout: null | ReturnType<typeof setTimeout>;

    currentlyRunning: AsyncRunnable<any>;

    constructor() {
    }

    get isEmpty(): boolean {
        return !this.runnableQueue.length;
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
        return this.runnableQueue.shift();
    }

    cleanup() {
        this.currentlyRunning = null;
        this.runnableQueue.length = 0;
    }

    private appendElement(element: T) {
        //only if the first element is added we start with a trigger
        //otherwise a process already is running and not finished yet at that
        //time
        this.runnableQueue.push(element);
        if (!this.currentlyRunning) {
            this.runEntry();
        }
    }

    private runEntry() {
        if (this.isEmpty) {
            this.currentlyRunning = null;
            return;
        }
        this.currentlyRunning = this.dequeue();
        this.currentlyRunning
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
        try {
            if (this.currentlyRunning) {
                this.currentlyRunning.cancel();
            }
        } finally {
            this.cleanup();
        }
    }

    private callForNextElementToProcess() {
        this.runEntry();
    }
}