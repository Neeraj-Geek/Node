import fs from "fs";
import bcrypt from "bcrypt";
import readUsers from "../utils/readUsers.js";
import writeUsers from "../utils/writeUsers.js";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
const authController = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const users = await readUsers();
    const user = users.find((u) => u.email === email);

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist with this email" });
    }
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = {
      id: Date.now(),
      name,
      password: hashPassword,
      email,
    };
    user.push(newUser);
    await writeUsers(user);
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const authLoginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const users = await readUsers();
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    localStorage.setItem("username", user.name);
    res.status(200).send({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export { authController, authLoginController };
