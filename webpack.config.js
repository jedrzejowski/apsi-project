const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const clientConfig = {
    target: "web",
    entry: {
        main: "./src/index.tsx"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist/public/")
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            use: "ts-loader",
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    node: {
        fs: "empty"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "APSI APP",
            filename: "index.html",
            chunks:"main",
            meta: {
                viewport: "minimum-scale=1, initial-scale=1, width=device-width"
            }
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                // rest: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name(module) {
                //         // get the name. E.g. node_modules/packageName/not/this/part.js
                //         // or node_modules/packageName
                //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                //
                //         // npm package names are URL-safe, but some servers don't like @ symbols
                //         return `npm.${packageName.replace('@', '')}`;
                //     },
                // },
                rest: {
                    priority: 0,
                    test: /[\\/]node_modules[\\/]/,
                    name: "node-modules"
                },
                mui: {
                    priority: 10,
                    test: /\/node_modules\/@material-ui/,
                    name: "material-ui"
                },
            },
        },
    },
};

module.exports = [clientConfig];