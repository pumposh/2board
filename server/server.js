const http = require("http");
const url = require("url");
const { takeScreenshot } = require("./index");

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/screenshot" && parsedUrl.query.url) {
    try {
      const screenshotBuffer = await takeScreenshot(parsedUrl.query.url);
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(screenshotBuffer);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`Error: ${error.message}`);
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
