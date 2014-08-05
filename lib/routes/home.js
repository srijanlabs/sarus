var express = require('express');
var home = express.Router();

home
    .get('', function(req, res) {
        res.render('index');
    })
    .get(':anything', function(req, res) {

    });


module.exports = home;
