const express = require("express");
const app = express();
const port = 3000;

// Rotuers
const indexRouter = require("./routes/index");
const todoRouter = require("./routes/todo");

app.use("/", indexRouter);
app.use("/api/todo", todoRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});