const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const { series, home } = require("../database/data");

//Livereload code
const liveReloadServer = livereload.createServer();
liveReloadServer.watch("public");
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload());
//End of livereload code

// middleware
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.render("../client/pages/home", { data: home });
});

// Series route
app.get("/series", (req, res) => {
  res.render("../client/pages/series", { data: series });
});

// Route for viewing details of each series
app.get("/series/:id", (req, res) => {
  const requestedSeriesTitle = req.params.id;

  //looping to get a series with same title
  const selectedSeries = series.find(
    (series) => series.Title === requestedSeriesTitle
  );

  //Rendering selected series Or throwing an error if not found
  if (selectedSeries) {
    res.render("../client/pages/info", { data: selectedSeries });
  } else {
    res.status(404).render("../client/pages/errorPage");
  }
});

//Middleware for handling error page
app.all("*", (req, res) => {
  res.status(404).render("../client/pages/errorPage");
});

//Start server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
