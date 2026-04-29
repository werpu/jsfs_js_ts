// webpack.config.ts
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
