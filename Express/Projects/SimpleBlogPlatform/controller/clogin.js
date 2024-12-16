import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const clogin = (req, res) => {
  const { email, password } = req.body;
  const filePath = path.join(process.cwd(), "./data/user.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let users;
    try {
      users = data ? JSON.parse(data) : [];
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      return res.status(500).send("Internal Server Error");
    }

    // Check if the email exists and validate the password
    const user = Object.values(users).find((value) => value.email === email);

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).send("Internal Server Error");
        }
        if (result) {
          req.session.user = {
            username: user.username,
            email: user.email,
          };
          return res.render("homePage", { message: req.session.user.username });
        } else {
          return res.render("loginPage", { message: "Invalid password" });
        }
      });
    } else {
      return res.render("loginPage", { message: "Invalid email" });
    }
  });
};

export default clogin;
