import fs from "fs";

const getAllTasks = (req, res) => {
  try {
    fs.readFile("./task.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.json(data);
      console.log(data);
    });
  } catch (error) {
    throw new Error(error);
  }
};
export default getAllTasks;
