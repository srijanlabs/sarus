var express = require('express');
var home = express.Router();

home
    .get('', function(req, res) {
        res.render('index');
    })
    .get('/:anything', function(req, res) {
      var path = "/#"+req.params.anything;
      res.redirect(path);
    });


module.exports = home;
