import express from "express";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cookieParser());
app.get("/setcookie", (req, res) => {
  const session_id = uuidv4();

  res.cookie("session_id", session_id);
  res.send(`Cookie set with UUID: ${session_id}`);
  console.log(session_id);
});

app.get("/getcookie", (req, res) => {
  console.log(req.cookies);
  if (req.cookies?.session_id) {
    console.log(`Cookie found: ${req.cookies?.session_id}`);
    res.send(`Access granted with session cookie: ${req.cookies?.session_id}`);
  } else {
    console.log("No cookie found");
    res.status(401).send("Unauthorized: No session cookie found");
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
