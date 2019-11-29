#!/usr/bin/env sh
npm run build
npm run test
cp dist/window/jsf.js ~/development/workspace/myfaces-js-integrationtests/src/main/webapp/resources/scripts/myfaces/api
cp dist/window/jsf.js.map ~/development/workspace/myfaces-js-integrationtests/src/main/webapp/resources/scripts/myfaces/api