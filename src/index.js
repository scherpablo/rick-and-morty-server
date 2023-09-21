const http = require("http");
const url = require("url");
const getCharById = require("./controllers/getCharById");

const PORT = 3001;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { pathname } = url.parse(req.url);

  if (pathname.startsWith("/rickandmorty/character")) {
    const parts = pathname.split("/");
    const id = parseInt(parts[3]);
    return getCharById(id, res);
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
