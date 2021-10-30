const express = require('express')
const asyncHandler = require('express-async-handler')

let app = express()

const PUBLIC_PATH = `${__dirname}/public/`;

app.use(express.urlencoded( {extended : false}));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(PUBLIC_PATH + 'index.html');
})

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage')
})
  
// POST method route
app.post('/weather', asyncHandler(async(req, res) => {
    let cityName = await req.body.city_name;
    console.log(cityName);
    res.send('POST request to the weather page');
}))

app.get('/weather', function (req, res) {
    res.sendFile(PUBLIC_PATH + 'weather.html');
})

app.listen(3000, function() {
    console.log("Server running on port 3000");
});