import * as webpack from 'webpack';
import * as path from 'path'

let libraryTarget = process.env.TARGET_TYPE || "window";

const config: webpack.Configuration =  {
    context: __dirname,
    entry: "./src/main/typescript/api/Jsf.ts",
    output: {
        path: path.resolve(__dirname, './dist/'+libraryTarget),
        libraryTarget: libraryTarget,
        filename: "jsf.js"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[name].js.map"
        })
    ]
}

export default config;

