import express from "express";
import route from "./route.js";

const app = express();
const port = 8081;
app.use(express.urlencoded({ extended: true })); // used for form data
app.use(express.json()); //used for incoming json data
app.use("/", route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
