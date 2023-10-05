const express = require("express");
const cors = require("cors");
const router = require("./routes/index");

const server = express();
const PORT = 3001;

server.use(cors());

server.use(express.json());
server.use("/rickandmorty", router);

module.exports = server;