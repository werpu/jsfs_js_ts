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

import jakarta.faces.FacesException;
import jakarta.faces.application.Resource;
import jakarta.faces.context.FacesContext;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

public class FacesJSMappingDecorator extends Resource {

    public static final String URL_ENCODING = "UTF-8";
    Resource delegate;

    public FacesJSMappingDecorator(Resource delegate) {
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
                    .forEach(line -> {
                        if (line.contains("//# sourceMappingURL=")) {
                            return;
                        }
                        try {
                            writer.write(line.getBytes());
                            writer.write("\n".getBytes());
                        } catch (IOException e) {
                            throw new FacesException(e);
                        }
                    });
            // let´s add the decoration
            String resourcePath = remapNames(delegate.getRequestPath());
            resourcePath = resourcePath.substring(resourcePath.lastIndexOf("/") + 1);

            writer.write("\n//# sourceMappingURL=".getBytes());
            writer.write(resourcePath.getBytes());
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
        try {
            return remapNames(delegate.getURL());
        } catch (MalformedURLException e) {
            throw new FacesException(e);
        }
    }

    @Override
    public boolean userAgentNeedsUpdate(FacesContext context) {
        return delegate.userAgentNeedsUpdate(context);
    }

    @Override
    public String getContentType() {
        return delegate.getContentType();
    }

    @Override
    public String getLibraryName() {
        return delegate.getLibraryName();
    }

    @Override
    public String getResourceName() {
        return remapNames(delegate.getResourceName());
    }

    @Override
    public void setContentType(String contentType) {
        delegate.setContentType(contentType);
    }

    @Override
    public void setLibraryName(String libraryName) {
        delegate.setLibraryName(libraryName);
    }

    @Override
    public void setResourceName(String resourceName) {
        delegate.setResourceName(resourceName);
    }

    @Override
    public String toString() {
        return delegate.toString();
    }

    private String remapNames(String in) {
        return in.replace("faces-development.js", "faces-development.js.map")
                .replace("faces.js", "faces.js.map");
    }

    private URL remapNames(URL in) throws MalformedURLException {
        return new URL(in.toString().replace("faces-development.js", "faces-development.js.map")
                .replace("faces.js", "faces.js.map"));
    }
}
