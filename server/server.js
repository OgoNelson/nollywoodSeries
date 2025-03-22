const express = require("express");
const bodyParser = require("body-parser");
const { series, home } = require("../database/data");
const app = express();
const PORT = 3000;

// middleware
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  res.render("../client/home", { data: home });
});

// Series route
app.get("/series", (req, res) => {
  res.render("../client/series", { data: series });
});

//Start server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
