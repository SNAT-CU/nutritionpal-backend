require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const http = require("http");
const https = require("https");

const fs = require("fs");

console.log({env:process.env});
console.log("privateKey",process.env.SSL_PRIVATE_KEY);
console.log("cert",process.env.SSL_CERTIFICATE);

const private_key = fs.readFileSync(process.env.SSL_PRIVATE_KEY, "utf8");
const certificate = fs.readFileSync(process.env.SSL_CERTIFICATE, "utf8");


const credentials = { key: private_key, cert: certificate };

const app = express();

app.use(
	"/",
	createProxyMiddleware({
		target: "https://platform.fatsecret.com/",
		changeOrigin: true,
	})
);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const PORT = process.env.PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

httpServer.listen(PORT, ()=> console.log("hosting http on", PORT));
httpsServer.listen(HTTPS_PORT, ()=> console.log("hosting https on", HTTPS_PORT));
