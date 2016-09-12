const express = require('express');
const request = require("request");
const fs      = require('fs');
const path       = require("path");


var app = express();
app.use(express.static(path.join(__dirname, ".")));

app.get('/geturl', function (req, res) {

    request({
        url: "https://api.tfl.gov.uk/BikePoint?app_id=&app_key= ",
        json: true
          }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                res.send(body);
                //console.log(body) // Print the json response
            }
    });

 // res.send('Hello World!');
});

app.get('/getfile', function (req, res) {
    var obj = JSON.parse(fs.readFileSync('BikePoint.json', 'utf8'));
  res.send(obj);
});


app.get('/', function (req, res) {
    var file = fs.readFileSync('index.html', 'utf8');
  res.send(file);
});


app.get('/bikes', function (req, res) {
    var tfl_json = JSON.parse(fs.readFileSync('BikePoint.json', 'utf8'));

    var output = [];

    for (i = 0; i < tfl_json.length; i++) {
        var item = {};
        item.name = tfl_json[i].commonName;
        item.id = tfl_json[i].id;
        item.lat = tfl_json[i].lat;
        item.lon = tfl_json[i].lon;
        //item.additionalProperties = tfl_json[i].additionalProperties;

        var properties = tfl_json[i].additionalProperties;
        for (j=0; j<properties.length; j++) {
            item[properties[j].key] = properties[j].value;

            // var key = properties[j].key;
            // item[key] = properties[j].value;
        }

        output[i] = item;
    }



  res.send(output);

});





app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
