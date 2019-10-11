import * as webpack from 'webpack';
import * as path from 'path'


const config: webpack.Configuration =  {
    context: __dirname,
    entry: "./main/typescript/api/jsf.ts",
    output: {
        path: path.resolve(__dirname, '../targets'),
        libraryTarget: process.env.TARGET_TYPE || "window",
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
    }
}

export default config;

