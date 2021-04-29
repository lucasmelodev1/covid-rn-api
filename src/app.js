const express = require("express");
const cors = require("cors");
const parseData = require("./functions/parser");

const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/cities/:city', (req, res, next) => {
  const parsedData = parseData(req.params.city);
  console.log(parsedData)
});

module.exports = app