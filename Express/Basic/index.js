import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/a", (req, res) => {
  res.send("Hello a World!");
});

app.listen(port, () => {
  console.log(`Server Up at http://127.0.0.1:${port}/`);
});
