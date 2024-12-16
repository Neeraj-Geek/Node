import { Router } from "express";
import homePage from "../Controller/home.js";
import aboutPage from "../Controller/about.js";

const route = Router();

route.get("/", homePage);
route.get("/about", aboutPage);

export default route;
