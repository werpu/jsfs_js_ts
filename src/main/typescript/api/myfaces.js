"use strict";
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
exports.__esModule = true;
var myfaces;
(function (myfaces) {
    var ConfigHolder = (function () {
        function ConfigHolder() {
            this.projectStage = null;
            this.separator = null;
        }
        return ConfigHolder;
    }());
    myfaces.ConfigHolder = ConfigHolder;
    myfaces.config = new ConfigHolder();
    if ("undefined" == typeof window.myfaces) {
        window.myfaces = myfaces;
    }
})(myfaces = exports.myfaces || (exports.myfaces = {}));
