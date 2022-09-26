# 🚀 Scratchpad for the typescript based reimplementation of jsf js

## What is this?

This project is a work in progress for a next gen typescript based 
reimplementation of jsf.js

The main goal is maintainability. It omits legacy browsers
with IE11 being the future the baseline for the moment.

It uses functional constructs on micro scale
to keep the maintainability and uses 
my own [mona-dish](https://github.com/werpu/mona-dish/) project as core framework base, to avoid
unnecessary colliding dependencies.

I might roll in MonaDish in the future
via npm, but for now simply having it in the codebase suffices
and prevents collisions with other frameworks.

But it still uses classes modules and inheritance
for code structuring.
The reason for this is, I do not like the one function for all
approach, Webpack can take care of the packaging.

Having smaller code parts makes it easier to test certain
aspects of the implementation.

Also one additional aspect of the new implementation it has a proper
test coverage via unit tests.

This was also severely lacking in my old implementation
where I just ran a set of 20 integration tests on macro scale.

## Status

ATM I am function complete, and the code
can be tested (final beta stages)
I probably will make a release before 2022.
It has been testing in MyFaces Tobago now for a year
and atm is being integrated into MyFaces as new
JS codebase.


## Usage

It still is a work in progress, but for testing purposes
it can be used (check the dist directory for builds, I consider
stable enough for testing, or your own builds)


## build

Make sure python 3.x is installed (needed by some build dependencies)


### General build 

run 

* npm install

#### On Windows

if not done yet

* npm install --global --production windows-build-tools

run
 
* npm install


### Tests

run

* npm test

### Test Coverage

* npm coverage



### Changelist compared to the original implementation

* *no_portlet_env* is no more
the configuration parameter 'no_portlet_env' has become obsolete with 
jsf 2.3 which introduced a proper namespaced viewstate handling
so it is gone now

* pps disabled for the moment

we had a special pps handling introduced in myfaces, a feature
probably never used (you basically could reduce the parameters
sent down by sending a list of pps ids). I have disabled it for the time being.
The code still is in there for the moment, but will be dropped
if no demand arises to enable it again.

* legacy browsers

In order to improve the maintainability I have dropped a lot
of shim and legacy code which was needed to support old browsers.
Since our main aim is long term maintainability there is a clear cut.
The lowest supported browser for the moment is Internet Explorer 11 
older browsers are now cut off. This should suffice for most if 
not all important environments. If you still use an older browser than 
IE11 you still can revert to the old codebase for the time being
(final cutoff point probably will come within the next few years)

IE11 might be cut off in the future, depending on the business requirements 
by the myfaces users

* performance

Given that we now have faster browsers and end user devices in the mobile
area than 10 years ago, my main focus was maintainability.
Maintainability and readability now comes before performance. So I sacrificed some
of the performance to achieve it.
Given that the most critical performance hits do not happen in the ajax area
this is a sacrifice I can live with for the time being.

* Client side i18n

The client side i18n error message translations have become more
of a liability than a feature.
For the time being all client side errors are reported in english.
I can reintroduce them, if there is a real demand.
But the size and maintainability tradeoff compared to what they
bring was not worth it to keep them anymore.
 
