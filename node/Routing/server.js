import http, { request } from "http";
import fs from "fs";

http
  .createServer(function (request, response) {
    let endPoint = request.url;
    if (endPoint == "/") {
      response.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("./index.html", "utf-8", (error, data) => {
        if (error) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Internal Server Error");
          console.error("Error reading index.html:", error);
        } else {
          response.end(data);
        }
      });
    } else if (endPoint == "/about") {
      response.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("./about.html", "utf-8", (error, data) => {
        if (error) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Internal Server Error");
          console.error("Error reading index.html:", error);
        } else {
          response.end(data);
        }
      });
    } else {
      response.writeHead(404, "Not Found", { "Content-Type": "text/html" });
      fs.readFile("./notFound.html", "utf-8", (error, data) => {
        if (error) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Internal Server Error");
          console.error("Error reading index.html:", error);
        } else {
          response.end(data);
        }
      });
    }
  })

  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
