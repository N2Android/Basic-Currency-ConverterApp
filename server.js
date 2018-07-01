const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
let apiKey = '8c9dc6a40ac1613486c1beb1971623c2';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

/*app.get('/', function (req, res) {
    res.send('Hello World!');
});*/

app.get('/', function(req, res) {
   res.render('index');
});

app.post('/', function (req, res) {
    //res.render('index');
    console.log(req.body.city);

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    request(url, function (err, response, body) {
        if(err){
            console.log('error:', err);
            res.render('index', {weather: null, error: 'Error please try again'});
        } else {
            console.log('body:', body);
            try {
                let weather = JSON.parse(body);
                if (weather.main === undefined){
                    res.render('index', {weather: null, error: 'Error, please try again'});
                } else {
                    console.log("JSON ", weather);
                    let message = `It's ${weather.main.temp} degrees Celsius in ${weather.name}!`;
                    console.log(message);
                    res.render('index', {weather: message, error: null});
                }
            } catch (e) {
                console.log('Parsing Error!', e);
                res.render('index', {weather: null, error: 'Parsing error, please try again!'});
            }
        }
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});