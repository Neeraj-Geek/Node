import fs, { readFileSync } from "fs";

let file = "./new.txt";
await fs.writeFileSync(file, "");
console.log(file);

for (let index = 0; index < 500; index++) {
  fs.appendFileSync(file, index.toString());
}

// Create a readable stream
const readStream = fs.createReadStream(file, { encoding: "utf8" });

// Listen for 'data' event to read chunks of data
readStream.on("data", (chunk) => {
  console.log("Received a chunk of data:", chunk);
});

// Listen for 'end' event to know when the stream is done
readStream.on("end", () => {
  console.log("No more data to read.");
});

// Handle any errors
readStream.on("error", (err) => {
  console.error("Error reading the file:", err);
});
