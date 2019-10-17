# 🚀 Scratchpad for the typescript based reimplementation of jsf js

## What is this?

This project is a work in progress for a typescript based 
reimplementation of jsf.js

The main goal is maintainability. It omits legacy browsers
with IE11 being the future the baseline for the moment.

It uses functional constructs on micro scale
to keep the maintainability and uses 
my own MonaDish project as core framework base, to avoid
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

Also one additional aspect of the new implementation will be
that it will be covered entirely by unit tests.

This was also severely lacking in my old implementation
where I just ran a set of 20 integration tests on macro scale.

## Status

ATM I am about 70% done with the core implementation, so stay tuned
something working will be available in a few weeks.


## Usage

For the time being I am working on it, so it cannot be used.
Once it is read for general testing, I will drop the info on how
to add it to your project.


