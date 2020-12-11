const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;

// Rotuers
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");
const tokenRotuer = require("./routes/token");

// CORS 처리
app.use(cors());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "X-AUTH-TOKEN");
  res.header("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);
app.use("/api/token", tokenRotuer);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});