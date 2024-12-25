import fs from "fs";

const deleteTaskById = (req, res) => {
  try {
    const data = fs.readFileSync("./task.json", "utf8");
    let tasks = data ? JSON.parse(data) : [];
    if (tasks.length <= 0) {
      res.status(404).send({ message: "Task list is empty" });
    } else {
      const id = parseInt(req.params.id);
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex == -1) {
        return res.status(404).send("Task not found");
      }
      tasks.splice(taskIndex, 1);
      fs.writeFileSync("./task.json", JSON.stringify(tasks));
      res.status(200).send("Deleted");
    }
  } catch (error) {
    console.log(error);
  }
};

export default deleteTaskById;
