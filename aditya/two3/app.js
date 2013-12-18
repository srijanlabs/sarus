var parser = require('rssparser');
var feed_url = "http://feeds.feedburner.com/SrijanBlogsdevsite";
var options = {};
var http = require('http');
var express = require('express');
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

var app = express();

app.configure(function(){app.use(allowCrossDomain);});

app.get('/:count', function(req, res, next){
	parser.parseURL(feed_url, options, function(err, out){
	  var count = req.params.count;
	  var article = count != "all" ? out.items[count] : out.items;
	  res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(article, null, 2));
    });
});
app.listen(3000, '127.0.0.1');


