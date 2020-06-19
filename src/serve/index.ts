import express from "express";
import {createProxyMiddleware, Filter, Options, RequestHandler} from "http-proxy-middleware";

const APP_PORT = parseInt(process.env.APP_PORT ?? "8090");
const APP_BACKEND = process.env.APP_BACKEND as string;
const app = express();

app.use("/api", createProxyMiddleware({
    target:APP_BACKEND,
    changeOrigin: true,
    pathRewrite: {
        "^/api": ""
    },
    onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader("referer", APP_BACKEND);
        proxyReq.setHeader("origin", APP_BACKEND);
    }
}));

app.use(express.static("./dist/public/"));

app.listen(APP_PORT);

