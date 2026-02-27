// webpack.config.ts
import * as webpack from "webpack";
import * as path from "path";

const __dirname = process.cwd();

function build(env: { [key: string]: string }, argv: { [key: string]: string }) {
    const libraryTarget = env.TARGET_TYPE ?? "window";

    const config: webpack.Configuration = {
        context: __dirname,
        entry: {
            jsf: path.resolve(__dirname, "./src/main/typescript/api/jsf.ts"),
            faces: path.resolve("./src/main/typescript/api/faces.ts"),
        },
        devtool: "source-map",
        output: {
            path: path.resolve(__dirname, "./dist/" + libraryTarget),
            libraryTarget: libraryTarget as any,
            filename: argv.mode == "production" ? "[name].js" : "[name]-development.js",
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
                            },
                        },
                    ],
                },
            ],
        },
    };

    return config;
}

export default build;