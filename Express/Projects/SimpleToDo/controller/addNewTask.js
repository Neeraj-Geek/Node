import fs from "fs";

const addNewTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const id = Date.now();
    const newTask = {
      id: id,
      title: title,
      description: description,
      status: status,
    };
    const stats = await fs.statSync("./task.json");
    if (stats.size === 0) {
      const tasks = [];
      tasks.push(newTask);
      fs.writeFileSync("./task.json", JSON.stringify(tasks));
    } else {
      const tasks = JSON.parse(fs.readFileSync("./task.json"));
      tasks.push(newTask);
      fs.writeFileSync("./task.json", JSON.stringify(tasks));
    }
  } catch (error) {
    console.log(error);
  }
};

export default addNewTask;
