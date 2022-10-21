/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.example.jsfs_js_ts;

import jakarta.faces.application.Resource;
import jakarta.faces.context.FacesContext;

import java.io.*;
import java.net.URL;
import java.util.Map;

/**
 * This class replicates a certain behavior we have
 * in myfaces for the internal faces.js (which is based
 * upon this projects code)
 * MyFaces has a resource loader
 * which replaces el constructs with their variable values, in faces.js
 * We replicate this here in a somewhat hackish manner, atm
 * only the context path is generated this way, because
 * for other constructs which we use it we have pure js fallbacks
 * delivering the same values
 *
 * You can use this class if you need or to provide the requestContextPath
 * on js level (and extend it if you need to provide more)
 */
public class DecoratedFacesJS extends Resource {

    Resource delegate;

    public DecoratedFacesJS(Resource delegate) {
        this.delegate = delegate;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        try (
                InputStream inputStream = delegate.getInputStream();
                ByteArrayOutputStream writer = new ByteArrayOutputStream();
        ) {
            new BufferedReader(new InputStreamReader(inputStream))
                    .lines()
                    .map(line -> {
                        //we theoretically could replace this with an el resolver
                        //but for now checking for the exact pattern suffices
                        String PATTERN = "#{facesContext.externalContext.requestContextPath}";
                        return line != null && line.contains(PATTERN) ? line.replace(PATTERN, FacesContext.getCurrentInstance().getExternalContext().getRequestContextPath()) : line;
                    }).forEach(line -> {
                        try {
                            writer.write(line.getBytes());
                            writer.write("\n".getBytes());
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    });
            return new ByteArrayInputStream(writer.toByteArray());
        }
    }

    @Override
    public String getRequestPath() {
        return delegate.getRequestPath();
    }

    @Override
    public Map<String, String> getResponseHeaders() {
        return delegate.getResponseHeaders();
    }

    @Override
    public URL getURL() {
        return delegate.getURL();
    }

    @Override
    public boolean userAgentNeedsUpdate(FacesContext context) {
        return delegate.userAgentNeedsUpdate(context);
    }
}
