import * as webpack from 'webpack';
import * as path from 'path'

let TerserPlugin = require('terser-webpack-plugin');
let BrotliPlugin = require('brotli-webpack-plugin');
let ZopfliPlugin = require("zopfli-webpack-plugin");

let libraryTarget = process.env.TARGET_TYPE || "window";

const config: webpack.Configuration = {
    context: __dirname,
    entry: "./src/main/typescript/api/Jsf.ts",
    output: {
        path: path.resolve(__dirname, './dist/' + libraryTarget),
        libraryTarget: libraryTarget,
        filename: "jsf.js"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/}
        ]
    },

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[name].js.map"
        }),
        //# sourceMappingURL=http://localhost:8080/IntegrationJSTest/javax.faces.resource/myfaces/api/main.js.map.jsf?ln=scripts
        new ZopfliPlugin({
            asset: "[path].gz[query]",
            algorithm: "zopfli",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        })

    ]
}

export default config;

