# 🚀 Scratchpad for the TypeScript-based reimplementation of jsf.js

## What is this?

This project is a work in progress for a next-generation TypeScript-based
reimplementation of jsf.js/faces.js.

The main goal is maintainability. It omits legacy browsers,
with Edge 14 and ECMAScript 2015 as the browser and ES baseline for now.

It uses functional constructs on a small scale for maintainability and uses
my own [mona-dish](https://github.com/werpu/mona-dish/) project as its core framework base to avoid
unnecessary dependency collisions.

But it still uses classes, modules, and inheritance
for code structuring.
The reason for this is that I do not like the one-function-for-all
approach, especially since TypeScript is now the implementation language
and allows proper code structure and modularization.

Webpack can take care of the packaging.

Having smaller code parts makes it easier to test certain
aspects of the implementation.

One additional aspect of the new implementation: it has proper
test coverage via Mocha-based unit tests.

This was also severely lacking in my old implementation
where I just ran a set of 20 integration tests on a macro scale.

## Status

We now have a stable version!
The current stable version, and first stable version, is 4.0.
Why 4.0 and not 1.0?
The reason is that it is Faces 4.0 compliant, but also Faces 2.3 compliant,
and is used in MyFaces 4.0.
To avoid version confusion, the project's stable version will always stay
in sync with the Faces implementation level it provides now and in the future.

### Special Info
Due to a small API change, if you want to embed the 4.0 version (faces.js)
in your code, a new attribute specified by the Faces 4.0 spec is not set
to its proper value: *contextpath*. This attribute is currently a value expression
which needs to be set by the loading implementation.

If you want to provide your own embedded solution, you will have
to set this value yourself. While my code does not use the attribute in the faces
namespace, other libraries or users might.

If you serve the code from MyFaces 4 instead of embedding it, the value will be preset
by the internal resource loader.

The JSF 2.3 version (jsf.js) is not affected by this change, so nothing needs to be done.
In fact the *contextpath* attribute is not present there.
All other attributes behave the same in both versions as in the original legacy codebase.



### General Build

Run:
* npm install ;to install the build time dependencies
* npm run build

#### On Windows

If not done yet:

* npm install --global --production windows-build-tools


Run:
 
* npm run build


### Tests

Run:

* npm run test

### Test Coverage

* npm run coverage



### Changelist compared to the original implementation

* *no_portlet_env* is no more
The configuration parameter `no_portlet_env` became obsolete with
JSF 2.3, which introduced proper namespaced view state handling,
so it is gone now.

* pps disabled for the moment

We had special PPS handling introduced in MyFaces, a feature
probably never used (you basically could reduce the parameters
sent down by sending a list of PPS IDs). I have disabled it for the time being.
The code is still there for now, but it will be dropped
if no demand arises to enable it again.

* legacy browsers

In order to improve maintainability, I have dropped a lot
of shim and legacy code which was needed to support old browsers.
Since our main aim is long-term maintainability, there is a clear cut.
The lowest supported browser for the moment is Edge 14.
Older browsers are now cut off. This should suffice for most, if
not all, important environments. If you still use a browser older than
Edge 14, you can still revert to the old codebase for the time being.
The final cutoff point will probably come within the next few years.


* performance

Given that we now have faster browsers and end-user devices in the mobile
area than 10 years ago, and spec conformity has improved a lot, my main focus was maintainability.
Maintainability and readability now come before performance, so I sacrificed some
performance to achieve it.
Given that the most critical performance hits do not happen in the AJAX area,
this is a sacrifice I can live with, for the time being.

* Client-side i18n

The client-side i18n error message translations have become more
of a liability than a feature.
For the time being, all client-side errors are reported in English.
I can reintroduce them if there is real demand.
But the size and maintainability tradeoff, compared to what they
bring, was not worth keeping them anymore.
 

* Mapping file support

The original implementation had various builds to support easier debugging (split, combined, compressed)

We now have only two builds: production and development.
However, I have introduced mapping file support.
To enable this support you have to reference the FacesJSMappingDecorator unless the mapping file
is reachable via the normal request (mapping files are bundled).
This works for normal includes, but if you include jsf.js in a resource library, you have to use
the decorator provided.

Usage *faces-config.xml*
```xml

<application>
    <resource-handler>com.example.jsfs_js_ts.FacesJSMapFileResourceWrapper</resource-handler>
</application>
```

This resource decorator automatically detects a faces*.js file coming from a resource library
and adjusts the references in the resource according to the request patterns.

## Upload Support

As a non-standard extension, XMLHttpRequestUpload support is added.

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
            load: (upload: XMLHttpRequestUpload, event: ProgressEvent) => loadTriggered = true,
            loadend: (upload: XMLHttpRequestUpload, event: ProgressEvent) => loadendTriggered = true,
            error: (upload: XMLHttpRequestUpload, event: ProgressEvent) => errorTriggered = true,
            abort: (upload: XMLHttpRequestUpload, event: ProgressEvent) => abortTriggered = true,
            timeout: (upload: XMLHttpRequestUpload, event: ProgressEvent) => timeoutTriggered = true,
        }
    }
});
```

## Changes since 4.0

* Core fixes
    * Updated the codebase build to TypeScript 6.
    * Fixed code for TypeScript 6's stronger type enforcement rules.
    * Fixes cases like `404`/`500` with empty, HTML, invalid XML, or otherwise non-partial-response bodies being incorrectly reported as `malformedXML` or
      `emptyResponse`.
    * Malformed XML is now only reported as `malformedXML` for successful HTTP responses.
    * XHR timeout now emits the timeout event and reports `httpError`.
    * XHR abort now reports `httpError`.
    * Fixed handling of browser-cancelled XHRs: cancellation-style responses (`status=0`, `readyState=4`, empty response text, and null XML), observed in older Safari/WebKit and Chrome/Chromium versions during navigation or download handoff, are treated as queue cleanup and do not fire user `onerror`.
    * Multipart requests no longer get an explicit URL-encoded `Content-Type`; the browser can set the proper multipart boundary.
    * WebSocket Faces `onerror` now matches the spec: reconnectable abnormal closes call `onerror` before reconnecting.
    * WebSocket reconnect scheduling now keeps the correct `this` binding.
    * WebSocket reconnect now increments attempts before scheduling, clears the stale socket, and creates a fresh socket on reconnect.
    * `PushImpl.reset()` now closes existing sockets before clearing socket/component registries.
    * Pending WebSocket callbacks now return cleanly if the channel registry has already been torn down.
    * Preserved stale WebSocket component pruning when moving Faces `onerror` handling from native `WebSocket.onerror` to reconnectable close handling.
    * The JSF 2.3 compatibility shim now adapts the old `jsf.push.init` signature without mutating the shared Faces 4 `faces.push` object.
    * Push typings now include both the Faces 4 signature with `onerror` and the legacy JSF-compatible signature without it.
    * Renamed the reference to the shared API to `myfacesApi` for code clarity.
    * Cleaned up `myfaces.ab` init code in `jsf.ts` to match the `faces.ts` init code.

* Core improvements
    * Refactored upload callback registration in `XhrRequest` into `registerUploadCallbacks()`.
    * Simplified timeout/header setup.
    * Cleaned up and simplified `XhrFormData`.
    * Clarified view state ordering so it is applied after field encoding and not double-counted.

* Tests added or expanded
    * Added tests for `4xx` non-XML responses returning `httpError`.
    * Added tests for `5xx` valid XML responses still returning `httpError`.
    * Added tests for successful empty responses returning `emptyResponse`.
    * Added tests for successful malformed XML returning `malformedXML`.
    * Added tests for XHR timeout behavior.
    * Added tests for XHR abort behavior.
    * Added tests for browser-cancelled XHR handling using the observed `status=0` cancellation fingerprint.
    * Added or expanded `XhrFormData` tests for normal encoding, multi-value fields, view state, view state de-duplication, partial IDs, multipart detection,
      `FormData` output, and naming-container remapping.
    * Expanded WebSocket tests for Faces 4 `onerror`.
    * Expanded WebSocket tests for abnormal-close reconnect behavior.
    * Expanded WebSocket tests for cumulative reconnect delays and stale socket cleanup across consecutive failed reconnect attempts.
    * Expanded WebSocket tests for terminal expired-close behavior.
    * Expanded WebSocket tests for stale component cleanup.
    * Expanded WebSocket tests for idempotent init.
    * Expanded WebSocket tests for behavior dispatch.
    * Expanded WebSocket tests for shared socket fan-out.
    * Renamed the websocket test file from `WebsocketTest.ts` to `WebsocketTest.spec.ts`; the old name prevented the tests from running.


## Changes since 4.1.0-beta-10

* Core fixes

  * Push/Websocket onOpen onClose callback lifecycle fixes according to spec behavior
  * WebSocket `onopen` now fires only for the first connection attempt, not for automatic reconnects.
  * Failed first WebSocket connection attempts are now treated as terminal: `onclose` is called, no reconnect is scheduled, and `onerror` is not called.
  * WebSocket close code `1000` is now treated as terminal for any reason, not only `REASON_EXPIRED`.
  * WebSocket close code `1008` (`Policy Violation`) is now treated as terminal and does not reconnect.
  * WebSocket reconnect exhaustion now calls `onclose` and stops reconnecting after `MAX_RECONNECT_ATTEMPTS`.
  * Terminal WebSocket closes now reset reconnect state so a later explicit `open()` starts as a fresh connection.

* Tests added or expanded
  * Added tests to verify the `onopen`/`onclose` callback lifecycle.
  * Added tests that `onopen` is not fired again after a successful automatic reconnect.
  * Added tests that reconnect attempts reset after a successful reconnect.
  * Added tests that max reconnect exhaustion calls `onclose`.
  * Added tests that close code `1008` is terminal and does not reconnect.
  * Added tests that explicit `open()` after a terminal close fires `onopen` again as a fresh connection.
  * JSF 2.3 jsf.push.init compatibility test added

4.1.0-beta.12

Bug Fixes

- WebSocket push spec alignment (PushImpl.ts): Full compliance with the Jakarta Faces push specification on 4+ and 2.3 level
  - hasEverConnected flag is now set before firing onopen callbacks (prevents re-entrant terminal-close edge case)
  - Code 1000 (normal closure) is now always treated as terminal regardless of reason, per spec
  - reconnectAttempts and hasEverConnected are reset after a terminal close, allowing faces.push.open() to re-establish a connection and fire onopen again
- XhrQueueController debounce race condition: Each XhrQueueController instance now uses a unique debounce key — previously all instances shared one key, causing     
  enqueues on separate instances to cancel each other's debounce window
- Code cleanup: Removed dead exports from ResponseDataResolver.ts; minor cleanup in _api.ts and PushImpl.ts

Improvements

- PushImpl.ts readability: Lifecycle code refactored for clarity
- FileUtils.ts: Minor code improvements (stricter equality, cleaner split)

Tests

- Added tests for WebSocket re-open after terminal close
- Added XhrQueueController two-instance debounce isolation test
- Added direct unit tests for FileUtils (encodeFormData, decodeEncodedValues, fixEmptyParameters)
- Added tests for Assertions.ts — branch coverage up to ~88%
- Added tests for ResponseDataResolver.resolveContexts
- Added tests for ExtDomQuery (nonce DOM fallback, runHeadInserts text-node path) and ExtConfig (append, appendIf, deepCopy)
- Added tests for HiddenInputBuilder, Lang, and async queue     


## 4.1.0-beta.13

- Added AI disclaimers to fulfill the ASF criteria for code being integrated into the Apache MyFaces codebase

Note as of Version 4.0 the code has been improved with the help of 
generative AI Tooling, as per https://www.apache.org/legal/generative-tooling.html
disclosures now are added!
See AI_CONTRIBUTIONS.md for full disclosure

