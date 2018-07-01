const request = require('request');

let apiKey = '8c9dc6a40ac1613486c1beb1971623c2';
let city = 'Johannesburg';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
        console.log('body:', body);
    }
});
