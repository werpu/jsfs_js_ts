import {ListenerQueue} from "../../../main/typescript/impl/util/ListenerQueue";
import { expect } from "chai";

describe("it must have tests on the listener queue because it is used", function() {

    it("must have listeners added", function() {
        let queue = new ListenerQueue();
        let called = 0;
        let theData = null;
        queue.enqueue((data) => {
            called++;
        })
        queue.enqueue((data) => {
            called++;
            theData = data;
        })

        expect(queue.length).to.eq(2);
        queue.broadcastEvent("data");

        expect(called).to.eq(2);
        expect(theData).to.eq("data");
    })


});