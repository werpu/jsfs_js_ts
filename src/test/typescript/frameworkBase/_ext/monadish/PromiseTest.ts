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

import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Promise as ShimPromise} from "../../../../../main/typescript/_ext/monadish/Monad";

describe('promise tests', () => {

    it('simple promise', (done) => {

        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(1);
            }, 1);

        });
        let finallyCalled = false;
        let thenCalled = false;
        applyPromise.then((data: any): any => {
            thenCalled = true;
            expect(data).to.be.eq(1);
        }).finally(() => {
            finallyCalled = true
            expect(thenCalled).to.be.true;
            expect(finallyCalled).to.be.true;
            done();
        });


    });

    it('simple promise failure', (done) => {

        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                reject(1);
            }, 1);

        });
        let finallyCalled = false;
        let thenCalled = false;
        applyPromise.catch((data: any): void => {
            thenCalled = true;
            expect(data).to.be.eq(1);
        }).finally(() => {
            finallyCalled = true
            expect(thenCalled).to.be.true;
            expect(finallyCalled).to.be.true;
            done();
        });


    });

    it('chained promise', (done) => {

        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(1);
            }, 1);
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
            expect(thenCalled).to.be.true;
            expect(then2Called).to.be.true;
            expect(finallyCalled).to.be.true;
            done();
        });
    });

    it("Promise all test", (done) => {
        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(1);
            }, 1);

        });
        let applyPromise2 = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(2);
            }, 1);

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
            expect(thenCalled).to.be.true;
            expect(then2Called).to.be.true;
            expect(finallyCalled).to.be.true;
            done();
        });
    });

    it("Promise race test", (done) => {
        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(1);
            }, 1);

        });

        let applyPromise2 = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(2);
            }, 6);

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

        applyPromise3.then((val: any): any => {
            finallyCalled = true;
        });

        ShimPromise.all(applyPromise3).finally(() => {
            expect(thenCalled || then2Called).to.be.true;
            expect(then2Called).to.be.eq(false);
            expect(finallyCalled).to.be.true;
            done();
        });
    });

    it("Promise chain test", (done) => {
        var chainExecuted = false;
        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                apply(1);
            }, 1);

        });
        applyPromise.then(() => {
            return new ShimPromise((apply: Function, reject: Function) => {
                setTimeout(() => {
                    apply(2);
                }, 6);

            })
        }).then(() => {
            chainExecuted = true;
            done();
        });
    });

    it("Promise chain2 test", (done) => {
        var chainExecuted = false;
        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                reject(1);
            }, 1);

        });
        applyPromise.catch(() => {
            return new ShimPromise((apply: Function, reject: Function) => {
                setTimeout(() => {
                    apply(2);
                }, 6);

            })
        }).then(() => {
            chainExecuted = true;
            done();
        });

    });

    it("Promise chain3 test", (done) => {
        let chainExecuted = false;
        let promise2Called = false;
        let promise3Called = false;
        let promise4Called = false;

        let applyPromise = new ShimPromise((apply: Function, reject: Function) => {
            setTimeout(() => {
                reject(1);
            }, 1);

        }).catch(() => {
            return new ShimPromise((apply: Function, reject: Function) => {
                setTimeout(() => {
                    apply(2);
                }, 6);

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
            }, 1);

        }).then(() => {
            promise2Called = true;
        });
        let applyPromise3 = ShimPromise.all(applyPromise, applyPromise2).then(() => {
            promise3Called = true;
        });

        ShimPromise.all(applyPromise, applyPromise2, applyPromise3).finally(() => {
            expect(chainExecuted).to.be.true;
            expect(promise3Called).to.be.true;
            expect(promise4Called).to.be.true;
            done();
        });
    });

    it("Promise resolve test", (done) => {
        let promisCalled = false;
        const original = ShimPromise.resolve(true);
        const cast = ShimPromise.resolve(original);
        cast.then(function (v) {
            promisCalled = true;
            expect(v).to.be.true;
            done();
        });

    });

    it("Promise reject test", (done) => {
        let promisCalled = false;
        const original = ShimPromise.resolve(true);
        const original2 = ShimPromise.resolve(original);
        const cast = ShimPromise.reject(original2);
        cast.catch(function (v) {
            promisCalled = true;
            expect(v).to.be.true;
            done();
        });
    });
});


