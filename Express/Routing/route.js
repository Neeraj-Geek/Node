import express from "express";

const route = express.Router();
route.get("/", (req, res) => {
  res.send("This is home page");
});
route.post("/create", (req, res) => {
  res.send("This is create page");
});

route.delete("/delete", (req, res) => {
  res.send("This is delete page");
});

route.put("/update", (req, res) => {
  res.send("This is update page");
});

export default route;
