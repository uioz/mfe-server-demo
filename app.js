const packageJson = require("./package.json");
const { join } = require("path");
const express = require("express");

const app = express();

// static/xxxx -> static/express-dev-prototype/xxx
app.use(
  `/static/${packageJson.name}`,
  express.static(join(__dirname, "./static"))
);

// 响应 route.json 供其他源使用
app.get("/route.json", (_request, response) => {
  response.setHeader("Content-Type", "application/json; charset=UTF-8");
  response.sendFile(join(__dirname, "./route.json"));
});

function indexHtml(_request, response) {
  response.type("html").sendFile(join(__dirname, "./src/index.html"));
}

app.get("/", indexHtml);
app.get("/app2", indexHtml);
app.get("/helloworld", indexHtml);

// 其余的全部响应 404 not found
app.get("*", (_request, response) => {
  response.end("not founded on 3030");
});

app.listen(3000, () => console.log("listen at localhost:3000"));
