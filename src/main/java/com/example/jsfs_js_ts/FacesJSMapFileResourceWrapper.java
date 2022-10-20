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
package com.example.jsfs_js_ts;

import jakarta.faces.application.Resource;
import jakarta.faces.application.ResourceHandler;
import jakarta.faces.application.ResourceHandlerWrapper;

public class FacesJSMapFileResourceWrapper extends ResourceHandlerWrapper {
    public FacesJSMapFileResourceWrapper(ResourceHandler delegate) {
        super(delegate);
    }

    @Override
    public Resource createResource(String resourceName) {
        if (resourceName.contains("faces.js") || resourceName.contains("faces-development.js")) {
            return new DecoratedFacesJS(super.createResource(resourceName));
        }
        return super.createResource(resourceName);
    }

    @Override
    public Resource createResource(String resourceName, String libraryName) {
        if (!resourceName.contains(".map") && (resourceName.contains("faces.js") || resourceName.contains("faces-development.js"))) {
            return new FacesJSMappingDecorator(super.createResource(resourceName, libraryName));
        }
        return super.createResource(resourceName, libraryName);
    }

    @Override
    public Resource createResource(String resourceName, String libraryName, String contentType) {
        return super.createResource(resourceName, libraryName, contentType);
    }
}
