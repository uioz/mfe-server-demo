const packageJson = require("./package.json");
const { join } = require("path");
const express = require("express");

const app = express();

// static/xxxx -> static/express-dev-prototype/xxx
app.use(
    `/static/${packageJson.name}`,
    express.static(join(__dirname, "./dist/static"))
);

// 响应 mfe-route.json 供其他源使用
app.get("/mfe-route.json", (_request, response) => {
    response.setHeader("Content-Type", "application/json; charset=UTF-8");
    response.sendFile(join(__dirname, "./mfe-route.json"));
});

function indexHtml(_request, response) {
    response.type("html").sendFile(join(__dirname, "./dist/index.html"));
}

function testHtml(_request, response) {
    response.type("html").sendFile(join(__dirname, "./dist/test.html"));
}

app.get(['/', '/helloworld'], indexHtml);
app.get(['/app2', '/gameover'], testHtml);

// 其余的全部响应 404 not found
app.get("*", (_request, response) => {
    response.end("not founded on 3030");
});

app.listen(3000, () => console.log("listen at localhost:3000"));