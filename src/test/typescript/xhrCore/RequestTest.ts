import {describe, it} from "mocha";

/**
 * specialized tests testing the xhr core behavior when it hits the xmlHttpRequest object
 */
describe('Tests on the xhr core when it starts to call the request', function () {

    it('must have the standard parameters all in', function (done) {
        done();
    });

    it('it must have the pass through values properly passed', function (done) {
        done();
    });

    it('it must have the proper target type', function (done) {
        done();
    });

});

describe('Tests after core when it hits response', function () {

    it('must have passed all ajax phase events', function (done) {
        done();
    });

    it('it must have called request and the pass through values must be properly transferred into the context', function (done) {
        done();
    });

    it('it must have called onError in the error case', function (done) {
        done();
    });

    it('it must have proper error parameters in the onError case', function (done) {
        done();
    });

    it('error listeners must have been triggered in the onError case', function (done) {
        done();
    });
});

describe('Tests after core when errors out', function () {

});

describe('Myfaces specialized tests', function () {

    it('must have the _mf passthroughs in and out after the request succeeded', function (done) {
        done();
    });

    it('it must have proper _mf parameters in the onError case', function (done) {
        done();
    });

});