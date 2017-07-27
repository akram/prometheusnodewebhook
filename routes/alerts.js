var express = require('express');
var router = express.Router();
var thenWriteJson = require('then-write-json');

var alertsDir = process.env.ALERTS_DIR || '/alerts/'

router.post('/', function (req, res, next) {
    var fileName = alertsDir + Date.now() + '.json'
    thenWriteJson(fileName, req.body)
        .then(function (res) {
            console.log(fileName + ' written');
            //=> true 
        })
        .catch(console.error)
    res.send(JSON.stringify(req.body, null, 2));

});


module.exports = router;
