import express from "express";

const route = express.Router();
route.get("/", (req, res) => {
  res.send("This is home page");
});

//sending id as param
route.get("/:id", (req, res) => {
  let { id } = req.params; //destructuring params
  res.send(`This is home page of ${id}`);
});

// multiple params
route.get("/:id/:model", (req, res) => {
  let { id, model } = req.params; //destructuring params
  res.send(`This is home page of ${id},${model}`);
});

export default route;
