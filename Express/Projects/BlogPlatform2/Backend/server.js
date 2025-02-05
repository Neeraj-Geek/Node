import express from "express";
import fs, { writeFileSync } from "fs";
import cors from "cors";
import { timeLog } from "console";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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

app.post("/submit-post", (req, res) => {
  const { id, title, author, content } = req.body;
  if (!title || !author || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const posts = JSON.parse(fs.readFileSync("./Backend/posts.json"));
  if (posts) {
    const post = posts.find((p) => p.id === parseInt(id));
    if (post) {
      post.title = title;
      post.content = content;
      post.author = author;
      writeFileSync("./Backend/posts.json", JSON.stringify(posts));
      res.status(200).json("Updated");
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.post("/create-post", (req, res) => {
  const { id, title, author, content } = req.body;

  console.log(title, author, content);
  if (!title || !author || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }
  let date = new Date();
  const formattedDate = date.toLocaleDateString();
  let newPost = { id, title, author, content, formattedDate };
  const posts = JSON.parse(fs.readFileSync("./Backend/posts.json"));
  if (posts) {
    posts.push(newPost);

    writeFileSync("./Backend/posts.json", JSON.stringify(posts));
    res.status(200).json("Updated");
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
