import express, { Router } from "express";
import getAllTasks from "./controller/getAllTasks.js";
import addNewTask from "./controller/addNewTask.js";
import getTaskById from "./controller/getTaskById.js";
import UpdateTaskById from "./controller/updateTaskByid.js";
import deleteTaskById from "./controller/deleteTask.js";

const route = express.Router();

route.get("/tasks", getAllTasks);
route.get("/tasks/:id", getTaskById);
route.post("/tasks", addNewTask);
route.put("/tasks/:id", UpdateTaskById);
route.delete("/tasks/:id", deleteTaskById);

export default route;
