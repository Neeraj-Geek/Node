import fs from "fs";

// Create directory
fs.mkdir("new_file/file", { recursive: true }, (err) => {
  if (err) {
    console.log("Error creating directory:", err);
    return;
  }
  console.log("Directory created...");

  // Read directory contents
  fs.readdir("new_file", (err, dirData) => {
    if (err) {
      console.log("Error reading directory:", err);
      return;
    }

    // Write to file
    fs.writeFile("new_file/file/text.txt", "Hello, How are you?", (err) => {
      if (err) {
        console.log("Error writing to file:", err);
        return;
      }

      // Read file content
      fs.readFile("new_file/file/text.txt", "utf-8", (err, fileData) => {
        if (err) {
          console.log("Error reading file:", err);
          return;
        }

        // Append to file
        fs.appendFile("new_file/file/text.txt", " I'm fine", (err) => {
          if (err) {
            console.log("Error appending to file:", err);
            return;
          }

          // Read appended file content
          fs.readFile("new_file/file/text.txt", "utf-8", (err, fileData2) => {
            if (err) {
              console.log("Error reading appended file:", err);
              return;
            }

            console.log("Directory contents:", dirData);
            console.log("Initial file content:", fileData);
            console.log("Appended file content:", fileData2);

            // Remove file and directories
            fs.unlink("new_file/file/text.txt", (err) => {
              if (err) {
                console.log("Error removing file:", err);
                return;
              }

              fs.rmdir("new_file/file", (err) => {
                if (err) {
                  console.log("Error removing directory:", err);
                  return;
                }

                fs.rmdir("new_file", (err) => {
                  if (err) {
                    console.log("Error removing directory:", err);
                    return;
                  }

                  console.log("Removed file and directories.");
                });
              });
            });
          });
        });
      });
    });
  });
});
