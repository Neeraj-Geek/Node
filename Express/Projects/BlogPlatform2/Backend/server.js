import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./Backend/posts.json")));
});

app.get("/getpost/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const posts = JSON.parse(fs.readFileSync("./Backend/posts.json"));

  if (posts) {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.get("/deletepost/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const posts = JSON.parse(fs.readFileSync("./Backend/posts.json"));
  console.log(postId);
  const postIndex = posts.findIndex((post) => post.id === parseInt(postId));
  if (postIndex == -1) {
    return "Post not found";
  }
  posts.splice(postIndex, 1);
  fs.writeFileSync("./Backend/posts.json", JSON.stringify(posts));
  return res.send({ response: "Deleted" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
