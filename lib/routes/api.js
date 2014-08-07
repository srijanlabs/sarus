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
         * @augments {int} index  - article index to fetch
         * @augments {callback}
                 * @param  {err} err    -  error object of callback
                 * @param  {[type]} data - Data object As Article
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
         * @augments {int} offset  - from article number
         * @augments {int} count  - how many
         * @augments {callback}
                 * @param  {err} err    -  error object of callback
                 * @param  {[type]} data - Array of Data object As Articles [slugs for sidebar ]
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
