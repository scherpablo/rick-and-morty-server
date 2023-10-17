const express = require("express");
const cors = require("cors");
const router = require("./routes/index");

const server = express();

server.use(cors());

server.use(express.json());
server.use("/rickandmorty", router);

module.exports = server;