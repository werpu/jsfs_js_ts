import * as webpack from 'webpack';
import * as path from 'path'

let BrotliPlugin = require('brotli-webpack-plugin');
let CompressionPlugin = require('compression-webpack-plugin');



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
        entry: "./src/main/typescript/api/Jsf.ts",
        devtool: "source-map",

        output: {
            path: path.resolve(__dirname, './dist/' + libraryTarget),
            libraryTarget: libraryTarget,
            filename: (argv.mode == "production") ? "jsf.js" : "jsf-development.js"
        },
        resolve: {
            extensions: [".tsx", ".ts", ".json"],
            alias: {
                /*we load the reduced core, because there are some parts we simply do not need*/
               "mona-dish": path.resolve(__dirname, "node_modules/mona-dish/dist/js/commonjs/index_core.js")
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
                        loader: "ts-loader"
                    }], exclude: /node_modules/
                }, {
                    test: /jsf\.js$/,
                    loader: 'string-replace-loader',
                    options: {
                        search: 'jsf.js.map',
                        replace: 'jsf.js.map\n//# sourceMappingURL=jsf.js.map.jsf?ln=scripts',
                    }
                }
            ]
        },






        plugins: [

             new CompressionPlugin({
                filename: 'jsf.js.gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                threshold: 10240,
                minRatio: 0.3

            }),
            new BrotliPlugin({
                asset: 'jsf.js.br[query]',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    }
    return config;
}

export default build;

