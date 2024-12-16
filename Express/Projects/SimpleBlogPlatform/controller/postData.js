import fs from "fs";
import path from "path";

const postData = (req, res) => {
  const postData = req.body;

  let filePath = path.join(process.cwd(), "./data/post.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const fileData = data ? JSON.parse(data) : [];
    const length = Object.keys(fileData).length;

    postData.id = length + 1;

    fileData.push(postData);
    const formDataJson = JSON.stringify(fileData, null, 2);
    fs.writeFile(filePath, formDataJson, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("homePage", { message: req.session.user.username });
    });
  });
};
export default postData;
