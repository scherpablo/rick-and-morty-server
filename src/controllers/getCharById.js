const axios = require("axios");

const urlApi = process.env.URL_API;

const getCharById = (id, res) => {
  axios
    .get(`${urlApi}/character/${id}`)
    .then((response) => {
      const { name, gender, species, origin, image, status } = response.data;
      const character = {
        id,
        name,
        gender,
        species,
        origin: origin.name,
        image,
        status,
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(character));
    })
    .catch((error) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end({message: "Ruta no encontrada BACK"});
    });
};

module.exports = getCharById;
