import fs from "fs";

// Create directory
try {
  fs.mkdirSync("new_file/file", { recursive: true });
  console.log("Directory created...");

  // Read directory contents
  let dirData = fs.readdirSync("new_file");

  // Write to file
  fs.writeFileSync("new_file/file/text.txt", "Hello, How are you?");

  // Read file content
  let fileData = fs.readFileSync("new_file/file/text.txt", "utf-8");

  // Append to file
  fs.appendFileSync("new_file/file/text.txt", " I'm fine");

  // Read appended file content
  let fileData2 = fs.readFileSync("new_file/file/text.txt", "utf-8");

  console.log("Directory contents:", dirData);
  console.log("Initial file content:", fileData);
  console.log("Appended file content:", fileData2);

  // Remove file and directories
  fs.unlinkSync("new_file/file/text.txt");
  fs.rmdirSync("new_file/file");
  fs.rmdirSync("new_file");
  console.log("Removed file and directories.");
} catch (error) {
  console.log("Error:", error);
}
