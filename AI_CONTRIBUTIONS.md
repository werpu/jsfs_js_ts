# AI Contributions Disclosure

In accordance with the [Apache Software Foundation policy on generative AI tooling](https://www.apache.org/legal/generative-tooling.html), this file discloses that portions of this project were created or substantially modified with assistance from generative AI tools.

## Tool used

**Claude** (Anthropic) — conversational AI coding assistant

## Scope

All new source files and substantial modifications introduced from the TypeScript 6 migration onwards (starting with commit `d609321` in http://github.com/werpu/jsf_js_ts) were produced with AI assistance. This covers both production source code and test code.

### Newly created files (AI-generated)

- `src/main/typescript/@types/definitions/modules.d.ts`
- `src/main/typescript/test/api/JsfPushShimTest.spec.ts`
- `src/main/typescript/test/api/PushTypeCompatibility.ts`
- `src/main/typescript/test/impl/AssertionsTest.spec.ts`
- `src/main/typescript/test/impl/FileUtilsTest.spec.ts`
- `src/main/typescript/test/impl/ResponseDataResolverTest.spec.ts`
- `src/main/typescript/test/impl/util/ExtLangTest.spec.ts`
- `src/main/typescript/test/impl/util/HiddenInputBuilderTest.spec.ts`
- `src/main/typescript/test/xhrCore/WebsocketTest.spec.ts`

### Substantially modified files (AI-assisted)

- `src/main/typescript/api/_api.ts`
- `src/main/typescript/api/faces.ts`
- `src/main/typescript/api/jsf.ts`
- `src/main/typescript/impl/AjaxImpl.ts`
- `src/main/typescript/impl/PushImpl.ts`
- `src/main/typescript/impl/util/Assertions.ts`
- `src/main/typescript/impl/util/AsyncRunnable.ts`
- `src/main/typescript/impl/util/ExtDomQuery.ts`
- `src/main/typescript/impl/util/FileUtils.ts`
- `src/main/typescript/impl/util/HiddenInputBuilder.ts`
- `src/main/typescript/impl/util/Lang.ts`
- `src/main/typescript/impl/util/XhrQueueController.ts`
- `src/main/typescript/impl/xhrCore/ErrorData.ts`
- `src/main/typescript/impl/xhrCore/EventData.ts`
- `src/main/typescript/impl/xhrCore/IResponseProcessor.ts`
- `src/main/typescript/impl/xhrCore/RequestDataResolver.ts`
- `src/main/typescript/impl/xhrCore/Response.ts`
- `src/main/typescript/impl/xhrCore/ResponseDataResolver.ts`
- `src/main/typescript/impl/xhrCore/ResponseProcessor.ts`
- `src/main/typescript/impl/xhrCore/XhrFormData.ts`
- `src/main/typescript/impl/xhrCore/XhrRequest.ts`
- `src/main/typescript/myfaces/OamSubmit.ts`
- `src/main/typescript/test/frameworkBase/_ext/monadish/DomQueryTest.spec.ts`
- `src/main/typescript/test/frameworkBase/_ext/shared/StandardInits.ts`
- `src/main/typescript/test/impl/util/ExtDomQueryTest.spec.ts`
- `src/main/typescript/test/myfaces/OamSubmit.spec.ts`
- `src/main/typescript/test/queue/AsynchronousQueueTest.spec.ts`
- `src/main/typescript/test/xhrCore/ErrorChainTest.spec.ts`
- `src/main/typescript/test/xhrCore/FakeWebsocket.ts`
- `src/main/typescript/test/xhrCore/RequestTest.spec.ts`
- `src/main/typescript/test/xhrCore/ResponseTest.spec.ts`
- `src/main/typescript/test/xhrCore/TobagoFileUploadTest.spec.ts`
- `src/main/typescript/test/xhrCore/XhrFormDataTest.spec.ts`
- `src/main/typescript/@types/definitions/index.d.ts`

## Nature of AI assistance

The AI assistant was used interactively: the human author directed the work, reviewed all output, made corrections, 
and approved each change before it was applied. 
The AI did not commit code autonomously. All contributions remain under the Apache License 2.0.
