# 🚀 Scratchpad for the typescript based reimplementation of jsf js

## What is this?

This project is a work in progress for a next gen typescript based 
reimplementation of jsf.js/faces.js

The main goal is maintainability. It omits legacy browsers
with Edge 14 and Ecmascript 2015 being the browser and ES baseline for the moment.

It uses functional constructs on micro scale
to keep the maintainability and uses 
my own [mona-dish](https://github.com/werpu/mona-dish/) project as core framework base, to avoid
unnecessary colliding dependencies.

But it still uses classes modules and inheritance
for code structuring.
The reason for this is, I do not like the one function for all
approach, especially given we have Typescript now as implementation language
which allows a proper code structuring and modularization.

Webpack can take care of the packaging.

Having smaller code parts, makes it easier to test certain
aspects of the implementation.

Also one additional aspect of the new implementation: it has a proper
test coverage via Mocha based unit tests.

This was also severely lacking in my old implementation
where I just ran a set of 20 integration tests on macro scale.

## Status

ATM I am function in beta bugfixing stage, and the code
can be tested (final beta stages)
I probably will make a release at the same time MyFaces 4.0 
final hits the scene.
It has been testing in MyFaces Tobago now for a year
and atm is being integrated into MyFaces as new
JS/TS codebase.

Addition, for the integration in MyFaces, the api level has been
uplifted to Jakarta Faces 4.0
Note, this introduces some breaking changes, jsf jas been replaced with jakarta
and javax has been replaced by faces
so javax.faces.request becomes jakarta.faces.request

Note, a shim layer for backwards compatibility has been provided
you simply just need to load the generated. jsf.js file which goes down to 2.3 compatibility level
while loading faces.js will provide 4.0 compatibility

For this reason the version now also in the npm package is 4.0.x
(the pre changes code can still be reached in the 2.3 branch although
this branch is basically legacy, given we have the SHIM layer doing both)

### Special info    
Due to a small api change, if you want to embed the 4.0 version (faces.js)
in your code, a new attribute specified by the Faces 4.0 spec is not set
at its proper value, *contextpath*. This attribute atm is a value expression
which needs to be set by the loading implementation.

Now if you want to provide your own embedded solution and you will have
to set this value yourself. While my code does not use the attribute in the faces
namespace, other libraries or the users might.

If you serve the code from MyFaces 4 instead of embedding it, the value will be preset
by the internal resource loader.

The JSF 2.3 version (jsf.js) is not affected by this change, so nothing needs to be done.
In fact the *contextpath* attribute is not present there.
All other attributes behave the same in both versions as in the original legacy codebase.



## Usage

It still is code complete and in bugfixing phase, for testing purposes
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

We had a special pps handling introduced in myfaces, a feature
probably never used (you basically could reduce the parameters
sent down by sending a list of pps ids). I have disabled it for the time being.
The code still is in there for the moment, but will be dropped
if no demand arises to enable it again.

* legacy browsers

In order to improve the maintainability I have dropped a lot
of shim and legacy code which was needed to support old browsers.
Since our main aim is long term maintainability there is a clear cut.
The lowest supported browser for the moment is Edge 14.
Older browsers are now cut off. This should suffice for most, if 
not all important environments. If you still use an older browser than 
Edge 14 you still can revert to the old codebase for the time being
(final cutoff point probably will come within the next few years)


* performance

Given that we now have faster browsers and end user devices in the mobile
area than 10 years ago and the spec conformity has improved a lot, my main focus was maintainability.
Maintainability and readability now comes before performance. So I sacrificed some
of the performance to achieve it.
Given that the most critical performance hits do not happen in the ajax area
this is a sacrifice I can live with, for the time being.

* Client side i18n

The client side i18n error message translations have become more
of a liability than a feature.
For the time being all client side errors are reported in english.
I can reintroduce them, if there is real demand.
But the size and maintainability tradeoff, compared to what they
bring was not worth it to keep them anymore.
 
