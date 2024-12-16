import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

const cloginData = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map((error) => error.msg);
    return res.render("signUp", { errorMessage: errorMsg });
  }
  let formData = req.body;
  bcrypt.hash(formData.password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return;
    }

    formData.password = hash;
    let filePath = path.join(process.cwd(), "./data/user.json");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err && err.code !== "ENOENT") {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const fileData = data ? JSON.parse(data) : [];

      const emailExists = fileData.some(
        (user) => user.email === formData.email
      );
      if (emailExists) {
        return res.status(400).render("refreshScreen", {
          message: "Email already exists",
        });
      }

      fileData.push(formData);

      const formDataJson = JSON.stringify(fileData, null, 2);
      fs.writeFile(filePath, formDataJson, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          res.status(500).send("Internal Server Error");
          return;
        }
        res.render("refreshScreen", {
          message: "Form submitted successfully!",
        });
      });
    });
  });
};

export default cloginData;
