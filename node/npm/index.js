import http from "http";

let server = http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n");
  })
  .listen(8080);
console.log("sever up at http://127.0.0.1:8080/");
