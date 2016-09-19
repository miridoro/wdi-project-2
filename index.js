const express = require('express');
const request = require("request");
const fs      = require('fs');
const path    = require("path");
//added
const morgan     = require("morgan");
const bodyParser = require("body-parser");
const cors       = require("cors");
const mongoose   = require("mongoose");
const expressJWT = require("express-jwt");

const app = express();
//added
const config     = require("./config/config");
const apiRouter  = require("./config/apiRoutes");

//added
mongoose.connect(config.db);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));

//added
app.use("/api", expressJWT({ secret: config.secret })
  .unless({
    path: [
      { url: "/api/register", methods: ["POST"] },
      { url: "/api/login",    methods: ["POST"] },
    ]
  }));
app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
  if (err.name !== "UnauthorizedError") return next();
  return res.status(401).json({ message: "Unauthorized request." });
}



app.get('/geturl', function (req, res) {

    request({
        url: "https://api.tfl.gov.uk/BikePoint?app_id=&app_key= ",
        json: true
          }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                res.send(body);
            }
    });
});

app.get('/getfile', function (req, res) {
    var obj = JSON.parse(fs.readFileSync('BikePoint.json', 'utf8'));
  res.send(obj);
});


app.get('/', function (req, res) {
    var file = fs.readFileSync('index.html', 'utf8');
  res.send(file);
});


// app.get('/bikes', function (req, res) {
//     var tfl_json = JSON.parse(fs.readFileSync('BikePoint.json', 'utf8'));
//
//     var output = [];
//
//     for (i = 0; i < tfl_json.length; i++) {
//         var item = {};
//         item.name = tfl_json[i].commonName;
//         item.id = tfl_json[i].id;
//         item.lat = tfl_json[i].lat;
//         item.lon = tfl_json[i].lon;
//         //item.additionalProperties = tfl_json[i].additionalProperties;
//
//         var properties = tfl_json[i].additionalProperties;
//         for (j=0; j<properties.length; j++) {
//             item[properties[j].key] = properties[j].value;
//
//             //to simplify JSON set even more
//
//             // var key = properties[j].key;
//             // item[key] = properties[j].value;
//         }
//
//         output[i] = item;
//     }
//   res.send(output);
// });


// get data directly from url
app.get('/bikes', function (req, res) {

  request({
      url: "https://api.tfl.gov.uk/BikePoint?app_id=&app_key= ",
      json: true
        }, function (error, response,tfl_json) {

          if (!error && response.statusCode === 200) {
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

                    //to simplify JSON even more

                    // var key = properties[j].key;
                    // item[key] = properties[j].value;
                }

                output[i] = item;
            }
            res.send(output);
          }
  });
});


app.use("/api", apiRouter);

app.listen(config.port, () => console.log(`Express started on port: ${config.port}`));

module.exports = app;
