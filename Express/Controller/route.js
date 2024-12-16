import express from "express";
import { homePage, createPage, deletePage, updatePage } from "./controller.js";

const route = express.Router();
route.get("/", homePage);
route.post("/create", createPage);

route.delete("/delete", deletePage);

route.put("/update", updatePage);

export default route;
