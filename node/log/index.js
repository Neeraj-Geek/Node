const http = require("http");
const fs = require("fs");
const url = require("url");
const myServer = http.createServer((req, res) => {
  //   let reqData = {
  //     method: req.method,
  //     url: req.url,
  //     headers: req.headers,
  //   };
  let urlPath = req.url;
  //   let ip = req.socket.remoteAddress;

  console.log(urlPath);
  let parsedUrlPath = url.parse(req.url, true);
  console.log(parsedUrlPath);
  let log = `${Date.now()} - ${urlPath}\n`;

  fs.appendFile("./log.txt", log, (err) => {
    console.log("log saved");
  });
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
});
myServer.listen(3000, () => {
  console.log("server is up on http://127.0.0.1/3000");
});
