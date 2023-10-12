/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
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
import * as webpack from 'webpack';
import * as path from 'path'



/**
 * we need to define the export in a function
 * because the mode parameter is passed down via the argv
 *
 * @param env the environment
 * @param argv the arguments list
 */
function build(env: {[key:string]: string}, argv: {[key:string]: string}) {

    let libraryTarget = env.TARGET_TYPE ?? "window";

    const config: webpack.Configuration = {
        context: __dirname,
        entry: {
            jsf: "./src/main/typescript/api/jsf.ts",
            faces: "./src/main/typescript/api/faces.ts"
        },
        devtool: "source-map",

        output: {
            path: path.resolve(__dirname, './dist/' + libraryTarget),
            libraryTarget: libraryTarget,
            filename: (argv.mode == "production") ? "[name].js" : "[name]-development.js"
        },

        resolve: {
            extensions: [".tsx", ".ts", ".json"],
            alias: {
                /*we load the reduced core, because there are some parts we simply do not need*/
                //"mona-dish": path.resolve(__dirname, "node_modules/mona-dish/dist/js/commonjs/index_core.js")
                "mona-dish": path.resolve(__dirname, "node_modules/mona-dish/src/main/typescript/index_core.ts")
            }
        },
        externals: {
            "rxjs": "RxJS"
        },

        module: {
            rules: [
                // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
                {
                    test: /\.tsx?$/, use: [{
                        loader: "ts-loader",
                        options: {
                            allowTsInNodeModules: true
                        }
                    }]
                }
            ]
        }
    }
    return config;
}

export default build;

