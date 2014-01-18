/**
 * @file
 * Server to provide processed RSS feeds to the application.
 */

/**
 * Define dependencies
 */
var parser = require('rssparser');
var http = require('http');
var express = require('express');

// Initialize.
var app = express();

/**
 * Configuration
 */
// Set up port for the server.
app.set('port', process.env.PORT || 3000);
// Configure the feed url below.
var feed_url = "http://staging.srijan7v2.srijan-sites.com/blog/feed";
// Setup authentication for rss feed if required or comment the line below.
var options = {'auth': {'user': "staging", 'pass': "srijan", 'sendImmediately': false}};
// Configuration below allows cross domain requests or else
// the ajax requests to this service will fail.
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.configure(function(){app.use(allowCrossDomain);});

/**
 * Functions
 *  getSlug
 *    @returns query part of the url
 *  takeStartingAt
 *    @returns a subset of an array containing hashes
 *  getFeed
 *    @returns Fetches feed from source if not cached.
 */

// Global variable to hold rss feed content for caching purposes.
var feed = null;


// Function below returns slug from a url, assuming that the query part of the url is a slug. 
// Modify it to return slug correctly for differently structured urls.
var getSlug = function(str) {
                return str.split( "/" ).filter(function(n) {
                  return n;
                }).reverse()[0];
              };

// Function below returns a subset of an array containing hashes,
// filtering based on a property of the hashes
var takeStartingAt =  function (data, start) {
                        var result = [];
                        var skip = true;
                        for (var i = 0; i < data.length; i++) {
                          if (getSlug(data[i].url) === start) {
                            skip = false;
                          }
                          if (skip) {
                            continue;
                          }
                          result.push(data[i]);
                        }
                        return result;
                      };

// Get feed from cache if available, else fetch from source.
var getFeed = function (callback) {
                if (feed == null) {
                  parser.parseURL(feed_url, options, function(err, out) {
                    feed = out;
                    callback(err, out);
                    console.log('The request was fetched');
                    return false;
                  });
                }
                else {
                  callback(false, feed);
                  console.log('The request was cached');
                }
              }

// Check for data.
var validateData =  function(err, out) {
                      if (out == null) {
                        console.log("Request failed with error " + err);
                        return false;
                      }
                    }

/**
 * Set up paths for the application to use.
 */

// Clear cache.
app.get('/clear', function(req, res, next) {
  feed = null;
  getFeed(function(err, out){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(out, null, 2));
    });
  return false;
});

app.get('/:count', function(req, res, next) {
  getFeed(function(err, out) {
    // Check for data.
    validateData(err, out);
    var count = req.params.count;
    var article = count != "all" ? out.items[count] : out.items;
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(article, null, 2));
    });
});

app.get('/offset/:slug/:count', function(req, res, next) {
    getFeed(function(err, out) {
    // Check for data.
    validateData(err, out);
    var count = req.params.count;
    var slug = req.params.slug;
    var offsetItems = takeStartingAt(out.items, slug);
    var article = count != "all" ? offsetItems[count] : offsetItems;
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(article, null, 2));
    });
});

app.get('/slugs/:offset/:count', function(req, res, next) {
  var data = [];
  getFeed(function(err, out){
    // Check for data.
    validateData(err, out);
    var count = req.params.count;
    var items = out.items;
    var offset = 0;
    for (var i = offset; i < items.length; i++) {
      var current = items[i];
      data.push({'title': current.title, 'url': current.url, 'index': i});
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data, null, 2));
    });
});

/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
  console.log('Sarus RSS server listening on port ' + app.get('port'));
});