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

We now have a stable version!
The current stable version (and first stable version is 4.0)
Why 4.0 and not 1.0?
The reason for this is, it is faces 4.0 compliant (but also faces 2.3 compliant)
and also used in MyFaces 4.0.
In order to avoid version confusion the projects stable version always will be in 
sync with the Faces implementation level it provides now and in the future.

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
 

* Mapping file support

The original implementation had various builds to support easier debugging (split, combined, compressed)

We now have only two builds prod and development.
However I have introduced a mapping file support.
To enable this support you have to reference the FacesJSMappingDecorator unless the mapping file
is reachable via the normal request (mapping files are bundled).
This works for normal includes, but if you include the jsf.js in a resource library you have to use
the decorator provided.

Usage *faces-config.xml*
```xml

<application>
    <resource-handler>com.example.jsfs_js_ts.FacesJSMapFileResourceWrapper</resource-handler>
</application>
```

This resource decorator detects automatically a faces*.js file coming from a resource library
and adjusts the references in the resource accordingly to the request patterns

## Upload Support

As non standard extension XMLHttpRequestUpload support is added

```json
faces.ajax.request(document.getElementById("cmd_eval"), null,
{
    render: '@form',
    execute: '@form',
    myfaces: {
        upload: {
            progress: (upload: XMLHttpRequestUpload, event: ProgressEvent) => {
                caughtProgressEvents.push(event);
            },
            preinit: (upload: XMLHttpRequestUpload) => preinitTriggered = true,
            loadstart: (upload: XMLHttpRequestUpload, event: ProgressEvent) => loadstartTriggered = true,
            load: (upload: XMLHttpRequestUpload,  event: ProgressEvent) => loadTriggered = true,
            loadend: (upload: XMLHttpRequestUpload,  event: ProgressEvent) => loadendTriggered = true,
            error: (upload: XMLHttpRequestUpload,  event: ProgressEvent) => errorTriggered = true,
            abort: (upload: XMLHttpRequestUpload,  event: ProgressEvent) => abortTriggered = true,
            timeout: (upload: XMLHttpRequestUpload,  event: ProgressEvent) => timeoutTriggered = true,
        }
    }
});
```

## Changes since 4.0

* Elimination of Streams in favor of native arrays
* Providing an internal non intrusive shim for browsers which do not have array map and flapMap
(older Edge and Chromium versions) - done in mona-dish
* Adding a progress monitoring functionality under the myfaces namespace
* Bugfixes which improve tck compliance
* Integration in myfaces 4.0+ as default faces.js implementation



