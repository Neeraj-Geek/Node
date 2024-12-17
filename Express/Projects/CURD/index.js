import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
let users = [];
let Id = 1;

// get user data
app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.status(200).send(user);
});

// Add a new user
app.post("/signup", (req, res) => {
  let { name, phone } = req.body;
  let user = { id: Id, name, phone };
  users.push(user);
  Id++;
  res.status(201).send(user);
});

// Update a existing user
app.put("/signup/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  let { name, phone } = req.body;
  user.name = name;
  user.phone = phone;

  res.status(200).send(user);
});

//Delete the user
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));
  if (userIndex == -1) {
    return res.status(404).send("User not found");
  }
  users.splice(userIndex, 1);
  res.status(200).send("Deleted");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
