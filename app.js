 var express = require('express');
 var path = require('path');
 var favicon = require('serve-favicon');
 var logger = require('morgan');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 // var index = require('./routes/index');
 // var users = require('./routes/users');
 var app = express();
 var Client = require('node-rest-client').Client;
 var client = new Client();
 // view engine setup
 // app.set('views', path.join(__dirname, 'views'));
 // app.set('view engine', 'jade');
 // // uncomment after placing your favicon in /public
 // //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 // app.use(logger('dev'));
 // app.use(bodyParser.json());
 // app.use(bodyParser.urlencoded({
 //     extended: false
 // }));
 // app.use('/', index);
 app.get('/sendData', function (req, res) {
     var args = {
         data: {
             infusion: req.param('infusion')
             , volume: req.param('volume')
             , alertVolume: req.param('alertVolume')
         }
         , headers: {
             "Content-Type": "application/json"
         }
     };
     client.post("https://rajhackathon3.eu-gb.mybluemix.net/value1", args, function (data, response) {
         // parsed response body as js object 
         start_time = "02-02-2017 12:45:00"
             //         console.log(data);
             // raw response 
         console.log(data);
         res.header('Access-Control-Allow-Origin', "*")
         res.send({
             status: "Success"
         });
     });
     //          var totalVolume = 100;
     //     var totalVolume = req.param('totalVolume');
     //     client.get("https://rajhackathon3.eu-gb.mybluemix.net/value1", function (data, response) {
     //         // parsed response body as js object 
     //         console.log(response);
     //         var alertTime = '02-02-2017 14:45';
     //         var ivInfusionName = 'assaa';
     //         // raw response 
     //         //         console.log(response);
     //         //         var d = JSON.parse(response);
 });
 // direct way 
 module.exports = app;
 app.listen(3000);