const http = require("http");
const url = require("url");
const data = require("./utils/data");

const PORT = 4001;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { pathname } = url.parse(req.url);//Extraemos el pathname de la url

  if (pathname.startsWith("/rickandmorty/character")) {//Verificamos si la ruta comienza con...
    const parts = pathname.split("/");//Dividimos la ruta en partes mediante / y creamos un array con cada parte de la ruta
    const characterId = parts[3]; // El id está en la posición 3

    // Buscar el personaje por ID en data.js
    const character = data.find(//Buscamos el id dentro de data
      (character) => character.id === parseInt(characterId)//Convertomos el string a number
    );

    if (character) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(character));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Personaje no encontrado");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Ruta no encontrada");
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
