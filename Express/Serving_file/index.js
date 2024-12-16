import express from "express";
import path from "path";

const app = express();

const port = 8080;

app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "./public/index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(process.cwd(), "./public/about.html"));
});
app.listen(port, () => console.log(`server up at  http://127.0.0.1:${port}`));
