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
can be tested (alpha stage)
I probably will make a release before 2020.


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

