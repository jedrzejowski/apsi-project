const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const clientConfig = {
    target: "web",
    entry: {
        main: "./src/index.jsx"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist/public/")
    },
    module: {
        rules: [{
            test: /\.(ts|jsx)$/,
            use: "ts-loader",
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: [".ts", ".js", ".jsx", ".json"],
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