///////////////////
// Api Router    //
///////////////////
var express = require('express');
var api = express.Router();
var feedController = require('../controllers/feedController');

/**
 * Api Router instance.
 */
api
    /**
     * All the request for '/article/1' will be processed here.
     * @res.json sends json data of article which is requested.
     */
    .get('/article/:index', function(req, res) {
        /**
         * [Calling getArticle function of Feed Controller ]
         * @argument {int} index  - article index to fetch
         * @argument {callback Function}
                 * @param  {Object} err    -  error object of callback
                 * @param  {Object} data - Data object As Article
         * @return {null}
         */
        feedController.getArticle(parseInt(req.params.index), function(err, data) {
            res.json(data);
        });
    })
    /**
     * All the request for '/' will be processed here.
     * @res.render will render the home page or index page in result
     */
    .get('/slugs/:offset/:count', function(req, res) {
        /**
         * [Calling getSlug function of Feed Controller ]
         * @argument {int} offset  - from article number
         * @argument {int} count  - how many
         * @argument {callback}
                 * @param  {Object} err    -  error object of callback
                 * @param  {Object} data - Array of Data object As Articles [slugs for sidebar ]
         * @return {null}
         */
        feedController.getSlugs(parseInt(req.params.offset), parseInt(req.params.count) - 1, function(err, data) {
            res.json(data);
        });

    });


/**
 * [exports Api Router]
 * @type {[Router]}
 */
module.exports = api;
