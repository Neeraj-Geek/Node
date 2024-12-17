import express from "express";

import login from "./controller.js";
import { auth, auth2 } from "./middleware.js";

const app = express();
const port = 8080;
//app.get("/", auth("admin"), login);// use user define param

app.get("/:user", [auth(), auth2()], login);

app.listen(port, () => console.log(`server up at http://127.0.0.1:${port}`));
