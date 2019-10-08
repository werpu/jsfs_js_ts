import { expect } from 'chai';
import { describe, it } from 'mocha';

import * as sinon from 'sinon';
import {Promise as ShimPromise} from "../../../../../main/typescript/_ext/monadish/Monad";

describe('promise tests', () => {

    let clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });
    
    /*it('simple promise no async', () => {
     let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
     apply(1);
     });

     applyPromise.then((data: any): Promise => {
     expect(data).to.be.eq(1);
     return null;
     });
     });*/

    it('simple promise', () => {

        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(1);
            },  1);

        });
        let finallyCalled = false;
        let thenCalled = false;
        applyPromise.then((data: any): any => {
            thenCalled = true;
            expect(data).to.be.eq(1);
        }).finally(() => {
            finallyCalled = true
        });
        clock.tick(2);
        expect(thenCalled).to.be.true;
        expect(finallyCalled).to.be.true;
    });




    it('simple promise failure', () => {

        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                reject(1);
            },  1);

        });
        let finallyCalled = false;
        let thenCalled = false;
        applyPromise.catch((data: any): void => {
            thenCalled = true;
            expect(data).to.be.eq(1);
        }).finally(() => {
            finallyCalled = true
        });
        clock.tick(2);
        expect(thenCalled).to.be.true;
        expect(finallyCalled).to.be.true;
    });


    it('chained promise', () => {

        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(1);
            },  1);

        });
        let finallyCalled = false;
        let thenCalled = false;
        let then2Called = false;
        applyPromise.then((data: any): any => {
            thenCalled = true;
            expect(data).to.be.eq(1);
            return 2;
        }).then((data: any): any => {
            then2Called = true;
            expect(data).to.be.eq(2);
        }).finally(() => {
            finallyCalled = true
        });
        clock.tick(2);
        expect(thenCalled).to.be.true;
        expect(then2Called).to.be.true;
        expect(finallyCalled).to.be.true;
    });


    it("Promise all test", () => {
        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(1);
            },  1);

        });
        let applyPromise2 = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(2);
            },  1);

        });
        let applyPromise3 = ShimPromise.all(applyPromise, applyPromise2);

        let finallyCalled = false;
        let thenCalled = false;
        let then2Called = false;

        applyPromise.then((data: any): any => {
            thenCalled = true;
            expect(data).to.be.eq(1);
            return 2;
        });
        applyPromise2.then((data: any): any => {
            then2Called = true;
            expect(data).to.be.eq(2);
            return 2;
        });

        applyPromise3.finally(() => {
            finallyCalled = true;
        });


        clock.tick(4);
        expect(thenCalled).to.be.true;
        expect(then2Called).to.be.true;
        expect(finallyCalled).to.be.true;
    });

    it("Promise race test", () => {
        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(1);
            },  1);

        });
        let applyPromise2 = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(2);
            },  6);

        });
        let applyPromise3 = ShimPromise.race(applyPromise, applyPromise2);

        let finallyCalled = false;
        let thenCalled = false;
        let then2Called = false;

        applyPromise.then((data: any): any => {
            thenCalled = true;
            expect(data).to.be.eq(1);
            return 2;
        });
        applyPromise2.then((data: any): any => {
            then2Called = true;
            expect(data).to.be.eq(2);
            return 2;
        });

        applyPromise3.then((val: any):any => {
            finallyCalled = true;
        });


        clock.tick(4);

        expect(thenCalled || then2Called).to.be.true;
        expect(then2Called).to.be.eq(false);
        expect(finallyCalled).to.be.true;
    });

    it("Promise chain test", () => {
        var chainExecuted = false;
        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(1);
            },  1);

        });
        applyPromise.then(() => {
            return new ShimPromise((apply: Function, reject: Function) => {
                setTimeout(() => {
                    apply(2);
                },  6);

            })
        }).then(() => {
            chainExecuted = true;
        });
        clock.tick(8);
        expect(chainExecuted).to.be.true;

    });

    it("Promise chain2 test", () => {
        var chainExecuted = false;
        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                reject(1);
            },  1);

        });
        applyPromise.catch(() => {
            return new ShimPromise((apply: Function, reject: Function) => {
                setTimeout(() => {
                    apply(2);
                },  6);

            })
        }).then(() => {
            chainExecuted = true;
        });
        clock.tick(8);
        expect(chainExecuted).to.be.true;
    });

    it("Promise chain3 test", () => {
        var chainExecuted = false;
        var promise2Called = false;
        var promise3Called = false;
        var promise4Called = false;

        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                reject(1);
            },  1);

        }).catch(() => {
            return new ShimPromise((apply: Function, reject: Function) => {
                setTimeout(() => {
                    apply(2);
                },  6);

            })
        }).then(() => {
            chainExecuted = true;
            return ShimPromise.reject(true);
        }).catch((val: any) => {
            promise4Called = val;
        });

        let applyPromise2 = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                reject(1);
            },  1);

        }).then(() => {
            promise2Called = true;
        });
        let applyPromise3 = ShimPromise.all(applyPromise, applyPromise2).then(() => {
            promise3Called = true;
        });

        clock.tick(118);
        expect(chainExecuted).to.be.true;
        expect(promise3Called).to.be.true;
        expect(promise4Called).to.be.true;
    });

    it("Promise resolve test", () => {
        var promisCalled = false;
        var original = ShimPromise.resolve(true);
        var cast = ShimPromise.resolve(original);
        cast.then(function(v) {
            promisCalled = true;
            expect(v).to.be.true;
        });


        clock.tick(118);
        expect(promisCalled).to.be.true;
    });

    it("Promise reject test", () => {
        var promisCalled = false;
        var original = ShimPromise.resolve(true);
        var original2 = ShimPromise.resolve(original);
        var cast = ShimPromise.reject(original2);
        cast.catch(function(v) {
            promisCalled = true;
            expect(v).to.be.true;
        });


        clock.tick(118);
        expect(promisCalled).to.be.true;
    });

});


