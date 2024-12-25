import fs from "fs";

const UpdateTaskById = (req, res) => {
  try {
    const { title, description, status } = req.body;
    const data = fs.readFileSync("./task.json", "utf8");
    let tasks = data ? JSON.parse(data) : [];
    if (tasks.length <= 0) {
      res.status(404).send({ message: "Task list is empty" });
    } else {
      const id = parseInt(req.params.id);
      const task = tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.status = status;
        fs.writeFileSync("./task.json", JSON.stringify(tasks));
        res.status(200).send({ message: "Updated" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default UpdateTaskById;
