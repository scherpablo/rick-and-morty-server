const { Favorite } = require("../DB_connection");

const postFav = async (req, res) => {
  const { name, origin, status, image, species, gender } = req.body;

  if (!name || !origin || !status || !image || !species || !gender)
    return res.status(401).json({ msg: "Faltan datos" });

  try {
    await Favorite.findOrCreate({
      where: { name },
      defaults: { origin, status, image, species, gender },
    });

    const allFav = await Favorite.findAll();
    return res.status(201).json(allFav);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = postFav;
