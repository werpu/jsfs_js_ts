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
import * as webpack from "webpack";
import * as path from "path";

const __dirname = process.cwd();

type BuildMode = "development" | "production";

function createConfig(env: { [key: string]: string }, mode: BuildMode): webpack.Configuration {
    const libraryTarget = env.TARGET_TYPE ?? "window";

    return {
        mode,
        context: __dirname,
        entry: {
            jsf: path.resolve(__dirname, "./src/main/typescript/api/jsf.ts"),
            faces: path.resolve("./src/main/typescript/api/faces.ts"),
        },
        devtool: false,
        output: {
            path: path.resolve(__dirname, "./dist/" + libraryTarget),
            libraryTarget: libraryTarget as any,
            filename: mode == "production" ? "[name].js" : "[name]-development.js",
        },
        resolve: {
            extensions: [".tsx", ".ts", ".json"],
            alias: {
                // use reduced core for production bundle (named imports only)
                "mona-dish$": path.resolve(
                    __dirname,
                    "node_modules/mona-dish/src/main/typescript/index_core.ts"
                ),
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                allowTsInNodeModules: true,
                                configFile: path.resolve(__dirname, "src/main/typescript/tsconfig.json"),
                                reportFiles: ["src/**/*.ts", "src/**/*.tsx", "!src/**/*.spec.ts", "!node_modules/**"],
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: "[file].map",
                append: ({filename}) => {
                    const sourceMapUrl = "\n//# sourceMappingURL=[url]";

                    return filename?.startsWith("jsf")
                        ? `${sourceMapUrl}${sourceMapUrl}.jsf?ln=javax.faces`
                        : sourceMapUrl;
                },
            }),
        ],
    };
}

function build(env: { [key: string]: string }, argv: { [key: string]: string }) {
    if (argv.mode == "development" || argv.mode == "production") {
        return createConfig(env, argv.mode);
    }

    return [
        createConfig(env, "development"),
        createConfig(env, "production"),
    ];
}

export default build;
