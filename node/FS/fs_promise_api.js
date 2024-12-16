import fs from "fs/promises";

try {
  await fs.mkdir("new_file/file", { recursive: true });
  console.log("Directory created...");

  let dir_data = await fs.readdir("new_file");
  await fs.writeFile("new_file/file/text.txt", "Hello, How are you?");
  let file_data = await fs.readFile("new_file/file/text.txt", "utf-8");
  await fs.appendFile("new_file/file/text.txt", " I'm fine");
  let file_data2 = await fs.readFile("new_file/file/text.txt", "utf-8");

  console.log("Directory contents:", dir_data);
  console.log("Initial file content:", file_data);
  console.log("Appended file content:", file_data2);

  // Remove file and directories
  await fs.unlink("new_file/file/text.txt");
  await fs.rmdir("new_file/file");
  await fs.rmdir("new_file");
  console.log("Removed file and directories.");
} catch (error) {
  console.log("Error:", error);
}
