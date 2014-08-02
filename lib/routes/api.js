var express = require('express');
var api = express.Router();
var feedController = require('../controllers/feedController');

/* GET users listing. */
api
    .get('/article/:index', function(req, res) {
        feedController.getArticle(parseInt(req.params.index), function(err, data) {
            res.json(data);
        });
    })
    .get('/slugs/:offset/:count', function(req, res) {
        feedController.getSlugs(parseInt(req.params.offset), parseInt(req.params.count)-1, function(err, data) {
            res.json(data);
        });

    });

module.exports = api;
