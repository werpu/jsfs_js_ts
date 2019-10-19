import {describe} from "mocha";
import {expect} from "chai";
import {Stream} from "../../../../../main/typescript/ext/monadish/Stream";
import {LazyStream} from "../../../../../main/typescript/ext/monadish/LazyStream";


describe('early stream tests', () => {

    beforeEach(function () {
        this.probe = [1, 2, 3, 4, 5];
    });

    it("must iterate normal", function () {
        let stream = Stream.of<number>(...this.probe);
        let sum = 0;
        stream.each((data) => {
            sum = sum + data;
        });
        expect(sum).to.eq(15);

        let stream2 = LazyStream.of<number>(...this.probe);
        sum = 0;
        stream2.each((data) => {
            sum = sum + data;
        });
        expect(sum).to.eq(15);
    });

    it("must iterate filtered", function () {
        let stream = Stream.of<number>(...this.probe);
        let sum = 0;
        stream.filter((data) => data != 5).each((data) => {
            sum = sum + data;
        });
        expect(sum).to.eq(10);

        let stream2 = LazyStream.of<number>(...this.probe);
        sum = 0;
        stream2.filter((data) => data != 5).each((data) => {
            sum = sum + data;
        });
        expect(sum).to.eq(10);
    });

    it("must onElem", function () {
        let stream = Stream.of<number>(...this.probe);
        let sum = 0;
        let sum2 = stream.filter((data) => data != 5).onElem((data) => {
            sum = sum + data;
        }).reduce((el1, el2) => el1 + el2).value;
        expect(sum).to.eq(10);
        expect(sum2).to.eq(10);

        let stream2 = LazyStream.of<number>(...this.probe);
        sum = 0;
        sum2 = stream2.filter((data) => data != 5).onElem((data) => {
            sum = sum + data;
        }).reduce((el1, el2) => el1 + el2).value;
        expect(sum).to.eq(10);
        expect(sum2).to.eq(10);
    })

    it("must have a correct first last", function () {
        let stream = Stream.of<number>(...this.probe);

        let first = Stream.of<number>(...this.probe).filter((data) => data != 5).onElem((data) => {
        }).first().value;
        let last = Stream.of<number>(...this.probe).filter((data) => data != 5).onElem((data) => {
        }).last().value;
        expect(first).to.eq(1);
        expect(last).to.eq(4);

    });

    it("must have a correct first last lazy", function () {
        let stream = LazyStream.of<number>(...this.probe);

        let first = LazyStream.of<number>(...this.probe).filter((data) => data != 5).onElem((data) => {
            data;
        }).first().value;
        let last = Stream.of<number>(...this.probe).filter((data) => data != 5).onElem((data) => {
            data;
        }).last().value;
        expect(first).to.eq(1);
        expect(last).to.eq(4);

    });

    it("must have a correct limits", function () {
        let cnt = 0;
        let last = Stream.of<number>(...this.probe).filter((data) => data != 5).limits(2).onElem((data) => {
            cnt++;
        }).last().value;

        expect(last).to.eq(2);
        expect(cnt).to.eq(2);

    });

    it("must have a correct lazy limits", function () {
        let last = LazyStream.of<number>(...this.probe).filter((data) => data != 5).limits(2).onElem((data) => {
            data;
        }).last().value;

        expect(last).to.eq(2);

    })


    it("must correctly lazily flatmap", function () {

        let resultingArr = LazyStream.of<number>(...this.probe).flatMap((data) => LazyStream.of(...[data,2])).value;

        expect(resultingArr.length == 10).to.be.true;
        expect(resultingArr.join(",")).to.eq("1,2,2,2,3,2,4,2,5,2");
    });

    it("must correctly early flatmap", function () {

        let resultingArr = Stream.of<number>(...this.probe).flatMap((data) => Stream.of(...[data,2])).value;

        expect(resultingArr.length == 10).to.be.true;
        expect(resultingArr.join(",")).to.eq("1,2,2,2,3,2,4,2,5,2");
    });


    it("must correctly flatmap intermixed", function () {

        let resultingArr = LazyStream.of<number>(...this.probe).flatMap((data) => Stream.of(...[data,2])).value;

        expect(resultingArr.length == 10).to.be.true;
        expect(resultingArr.join(",")).to.eq("1,2,2,2,3,2,4,2,5,2");
    });

    it("must correctly flatmap intermixed2", function () {

        let resultingArr = Stream.of<number>(...this.probe).flatMap((data) => LazyStream.of(...[data,2])).value;

        expect(resultingArr.length == 10).to.be.true;
        expect(resultingArr.join(",")).to.eq("1,2,2,2,3,2,4,2,5,2");
    });

    it("must correctly pass anyMatch allMatch noneMatch", function () {
        let anyMatch = LazyStream.of<number>(...this.probe).anyMatch((item) => item == 3);
        let allMatch = LazyStream.of<number>(...this.probe).allMatch((item) => item < 6);
        let noneMatch = LazyStream.of<number>(...this.probe).noneMatch((item) => item > 5);

        expect(anyMatch).to.be.true;
        expect(allMatch).to.be.true;
        expect(noneMatch).to.be.true;
    })

    it("must correctly pass anyMatch allMatch noneMatch early", function () {
        let anyMatch = Stream.of<number>(...this.probe).anyMatch((item) => item == 3);
        let allMatch = Stream.of<number>(...this.probe).allMatch((item) => item < 6);
        let noneMatch = Stream.of<number>(...this.probe).noneMatch((item) => item > 5);

        expect(anyMatch).to.be.true;
        expect(allMatch).to.be.true;
        expect(noneMatch).to.be.true;
    })

});