'use strict';
/////////////////
// Home Router //
/////////////////
var express = require('express');
var home = express.Router();
/**
 * Home Router instance.
 */
home
    /**
     * All the request for '/' will be processed here.
     * @res.render will render the home page or index page in result
     */
    .get('', function(req, res) {
        res.render('index');
    })
    /**
     * All the request for '/:xyz' will be processed here.
     * @res.redirect append only # in between to indirectly force client side routing.
     */
    .get('/:anything', function(req, res) {
        var path = "/#" + req.params.anything;
        res.redirect(path);
    });




/**
 * [exports Home Router]
 * @type {[Router]}
 */
module.exports = home;



