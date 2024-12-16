import express from "express";
import route from "./route.js";

const app = express();
const port = 8080;

app.use("/", route);

app.listen(port, () => {
  console.log(`server is running at http://127.0.0.1:${port}/`);
});
