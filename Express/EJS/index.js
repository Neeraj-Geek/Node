import express from "express";
import route from "./Routes/routes.js";
const app = express();
const port = 8080;

// Set EJS as the templating engine
app.set("view engine", "ejs");

app.use("/", route);
app.listen(port, () =>
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
);
