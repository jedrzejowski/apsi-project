const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const nodeExternals = require("webpack-node-externals");

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
            chunks: "main",
            filename: "index.html",
            template: "index.ejs",
        }),
        // new BundleAnalyzerPlugin()
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
                vendor: {
                    priority: 0,
                    test: /\/node_modules\//,
                    name: "node-modules"
                },
                react: {
                    priority: 9,
                    test: /\/node_modules\/react/,
                    name: "react"
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

const serverConfig = {
    target: "node",
    entry: {
        serve: "./src/serve/index.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist/"),
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: [".ts", ".json"],
    },
    externals: [nodeExternals()]
};

module.exports = [clientConfig, serverConfig];