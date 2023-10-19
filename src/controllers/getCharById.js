const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const urlApi = process.env.URL_API;

const getCharById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios(urlApi + id);
    const { name, gender, species, origin, image, status } = data;
    const character = {
      id,
      name,
      gender,
      species,
      origin: origin.name,
      image,
      status,
    };
    return character.id
      ? res.json(character)
      : res.status(404).send({ message: "Not Found" });
  } catch (error) {
    return res.status(500).send(error.message)
  }
};

module.exports = getCharById;
