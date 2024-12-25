import fs from "fs";

const getTaskById = (req, res) => {
  try {
    const data = fs.readFileSync("./task.json", "utf8");
    let tasks = data ? JSON.parse(data) : [];
    if (tasks.length <= 0) {
      res.status(404).send({ message: "Task list is empty" });
    } else {
      const id = parseInt(req.params.id);
      const task = tasks.find((task) => task.id === id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default getTaskById;
