let http = require("http");

http
  .createServer(function (request, response) {
    if (request.url == "/") {
      response.writeHead(200, { "Content-Type": "text/plain" });
      console.log(111);
      response.end("Hello World");
    }
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
