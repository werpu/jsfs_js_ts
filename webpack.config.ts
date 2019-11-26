import * as webpack from 'webpack';
import * as path from 'path'

//let TerserPlugin = require('terser-webpack-plugin');
let BrotliPlugin = require('brotli-webpack-plugin');
let CompressionPlugin = require('compression-webpack-plugin');

/**
 * we need to define the export in a function
 * because the mode parameter is passed down via the argv
 *
 * @param env the environment
 * @param argv the arguments list
 */
function build(env, argv) {

    let libraryTarget = env.TARGET_TYPE ?? "window";

    const config: webpack.Configuration = {
        context: __dirname,
        entry: "./src/main/typescript/api/Jsf.ts",
        devtool: false,
        output: {
            path: path.resolve(__dirname, './dist/' + libraryTarget),
            libraryTarget: libraryTarget,
            filename: (argv.mode == "production") ? "jsf.js" : "jsf-development.js"
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".json"]
        },
        module: {
            rules: [
                // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
                {
                    test: /\.tsx?$/, use: [{
                        loader: "ts-loader"
                    }], exclude: /node_modules/
                }
            ]
        },

        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: (argv.mode == "production") ? "jsf.js.map" : "jsf-development.js.map"
            }),
            //# sourceMappingURL=http://localhost:8080/IntegrationJSTest/javax.faces.resource/myfaces/api/main.js.map.jsf?ln=scripts
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                threshold: 10240,
                minRatio: 0.3

            }),
            new BrotliPlugin({
                asset: '[path].br[query]',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8
            })

        ]
    }
    return config;
}
export default build;

