import {Lang} from "./Lang";
import {AsyncRunnable} from "./AsyncRunnable";
import {Queue} from "./Queue";

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
        if (!this.currentlyRunning) {
            this.runEntry();
        }
    }

    private runEntry() {
        if (this.isEmpty) {
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
        this.eventDispatcher.dispatchEvent(AsynchronouseQueue.EVT_NEXT);
    }

    private processNextElement() {
        this.currentlyRunning = null;
        if (!this.isEmpty) {
            this.runEntry();
        }
    }

}