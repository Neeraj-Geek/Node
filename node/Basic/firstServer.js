let http = require("http");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("Welcome to home page");
    } else if (req.url == "/about") {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("Welcome to about page");
    } else {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Not Found");
    }
  })
  .listen(8080);
console.log("Server running at http://127.0.0.1:8080/");
