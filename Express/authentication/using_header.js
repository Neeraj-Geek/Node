import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

// Set a UUID in the response header
app.get("/set-header", (req, res) => {
  const uuid = uuidv4();
  res.set("X-Session-ID", uuid);
  res.send(`UUID set in header: ${uuid}`);
});

// Check for UUID in the request header
app.get("/check-header", (req, res) => {
  const sessionId = req.headers["x-session-id"];

  if (sessionId) {
    res.send(`Access granted with UUID: ${sessionId}`);
  } else {
    res.status(401).send("Unauthorized: No session header found");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
