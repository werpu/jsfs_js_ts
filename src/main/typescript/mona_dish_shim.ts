
/*! Licensed to the Apache Software Foundation (ASF) under one or more
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

/**
 * Shim to provide a default export for mona-dish.
 *
 * The npm package only has named exports, which breaks the pattern:
 *   import pkg from 'mona-dish'; const { Lang } = pkg;
 *
 * Used via tsconfig paths (for tests/tsx). Webpack keeps its own alias to
 * index_core.ts for the reduced-core production bundle.
 *
 * Both import styles work:
 *   import { Lang } from 'mona-dish'                    // named import
 *   import pkg from 'mona-dish'; const { Lang } = pkg   // default import
 */
export * from "mona-dish/src/main/typescript/index";
import * as _monaDish from "mona-dish/src/main/typescript/index";
export default _monaDish;
