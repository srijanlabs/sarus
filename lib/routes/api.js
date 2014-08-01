var express = require('express');
var api = express.Router();
var feedController = require('../controllers/feedController');

/* GET users listing. */
api
    .get('/article/:index', function(req, res) {
        var data = feedController.getArticle(1);
        res.send(data);
    })
    .get('/article/:slug/:count', function(req, res) {
        var data = feedController.getArticles(0,1);
        res.send(data);
    })
    .get('/slugs/:offset/:count', function(req, res) {
        var data = feedController.getSlugs(1,3);
        res.send(data)
    });

module.exports = api;
