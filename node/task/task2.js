import http from "http";
import fs from "fs";
import path from "path";

const filePath = "N:wd/node/node/task/serve.txt";

const PORT = "8000";

function writeLog(reqData) {
  if (reqData.url != "/favicon.ico") {
    let logData = `${Date.now()} - ${reqData.url}\n`;
    fs.appendFile("./log.txt", logData, (err) => {
      if (err) {
        console.log("Error while writing the log file", err);
        res.writeHead(501, { "Content-Type": "text/plain" });
        res.end("server internal error");
      }
      console.log("log saved");
    });
  }
}
const server = http.createServer((req, res) => {
  try {
    writeLog(req);
    if (req.url === "/") {
      fs.readFile(path.basename(filePath), (err, fileData) => {
        if (err) {
          console.log("Error while Reading the file", err);
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("File not found");
        }

        res.writeHead(200, { "content-type": "text/plain" });
        res.end(fileData);
      });
    }
  } catch (error) {
    res.writeHead(500, { "content-type": "text/plain" });
    res.end("Server internal Error");
    console.error(error);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
