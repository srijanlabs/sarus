var parser = require('rssparser');
var feed_url = "http://feeds.feedburner.com/SrijanBlogsdevsite";
var options = {};
var http = require('http');
var express = require('express');
var app = express();

app.get('/:count', function(req, res, next){
	parser.parseURL(feed_url, options, function(err, out){
	  var article = out.items[req.params.count];
	  res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(article, null, 2));
    });
});
app.listen(3000, '127.0.0.1');


