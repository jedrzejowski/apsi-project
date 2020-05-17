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
            chunks: ["main"],
        })
    ]
};

module.exports = [clientConfig];