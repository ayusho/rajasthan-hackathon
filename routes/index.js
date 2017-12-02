var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("PRINTED2");
    res.render('index ')
});
//app.get('/sendData', function (req, res) {
//    console.log("Ayush");
//    //var startTime = req.param('');
//    res.send('Success');
//});
module.exports = router;