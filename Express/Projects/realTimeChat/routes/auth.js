import express, { Router } from "express";
import {
  authController,
  authLoginController,
} from "../controller/authController.js";
import { getMessages, sendMessage } from "../controller/chatController.js";

const route = express.Router();

route.post("/register", authController);
route.post("/login", authLoginController);

route.get("/messages", getMessages);
route.post("/sendmessage", sendMessage);

export default route;
