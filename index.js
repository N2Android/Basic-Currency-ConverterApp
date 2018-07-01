const request = require('request');
const argv = require('yargs').argv;

let apiKey = '8c9dc6a40ac1613486c1beb1971623c2';
let city = argv.c || 'johannesburg';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
        console.log('body:', body);
        try {
            let weather = JSON.parse(body);
            console.log("JSON ", weather);
            let message = `It's ${weather.main.temp} degrees Celsius in ${weather.name}!`;
            console.log(message);
        } catch (e) {
            console.log('Parsing Error!', e);
        }
    }
});
