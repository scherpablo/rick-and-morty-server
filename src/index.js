const express = require("express");
const cors = require("cors");
const router = require("./routes/index");

const server = express();
const PORT = 3001;

server.use(cors());

server.use(express.json());
server.use("/rickandmorty", router);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


