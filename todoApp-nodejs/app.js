const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;

// Rotuers
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");
const tokenRotuer = require("./routes/token");

app.use(cors());

app.use("/", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);
app.use("/api/token", tokenRotuer);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});