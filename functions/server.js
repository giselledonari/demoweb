const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const {init, getPib}=require('./db.js')
require('dotenv').config();

//cambiado
const app = express();


app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/lista", async (req, res) => {
  let respuesta= await getPib()
  res.send(respuesta)
});


module.exports.handler = serverless(app);
