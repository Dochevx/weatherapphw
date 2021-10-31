const express = require("express");
const cors = require("cors");
const superagent = require('superagent');

let app = express();
app.use(cors());

const PUBLIC_PATH = `${__dirname}/public/`;

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(PUBLIC_PATH + "index.html");
});

app.get("/", function (req, res) {
  res.send("GET request to the homepage");
});

app.post("/weather", function (req, res) {
  let cityName = req.query.city;
  callWeather(cityName, res);
});

app.get("/weather", function (req, res) {
  res.sendFile(PUBLIC_PATH + "weather.html");
});

app.listen(80, function () {
  console.log("Server running on port 80");
});

function callWeather(cityName, clientResponse){
  let response;
  superagent.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8f3c69e4c232321d91aa7d0ecbadbc5f&units=metric`)
  .end((err, res) => {
    if (err) { return console.log(err); }
    response = res.body;
    clientResponse.send(response);
  });
  return response;
}