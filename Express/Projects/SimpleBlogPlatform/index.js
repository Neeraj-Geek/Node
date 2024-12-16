import express from "express";
import route from "./routes/routes.js";
import sessionMiddleware from "./middleware/session.js";

const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(sessionMiddleware);
app.use("/", route);
app.listen(port, () => console.log(`server is up at http://127.0.0.1:${port}`));
