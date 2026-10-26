// تشغيل محلي للتجربة على جهازك: ANTHROPIC_API_KEY=... node server.js
// وافتح http://localhost:3000
const http = require("http");
const fs = require("fs");
const path = require("path");
const chat = require("./api/chat");
const config = require("./api/config");

const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png" };

http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  if (url === "/api/config") return config(req, res);
  if (url === "/api/chat") {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => { req.body = raw; chat(req, res); });
    return;
  }
  const file = path.join(__dirname, "public", url === "/" ? "index.html" : path.normalize(url).replace(/^(\.\.[\/\\])+/, ""));
  fs.readFile(file, (err, data) => {
    if (err) { res.statusCode = 404; return res.end("Not found"); }
    res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
    res.end(data);
  });
}).listen(process.env.PORT || 3000, () => console.log("http://localhost:" + (process.env.PORT || 3000)));
