var parser = require('rssparser');
var feed_url = "http://staging.srijan7v2.srijan-sites.com/blog-feeds.xml"//"http://feeds.feedburner.com/SrijanBlogsdevsite";
var options = {'auth': {'user': "j2r@srijan.in", 'pass': "123", 'sendImmediately': false}};
var http = require('http');
var express = require('express');
var RequestCaching = require('node-request-caching');
var rc = new RequestCaching();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

var getSlug = function( str ) {
      return str.split( "/" ).filter(function( n ) {
        return n;
      }).reverse()[ 0 ];
    };


var takeStartingAt = function (data, start) {
    console.log(data);
    console.log(start);
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

var app = express();

app.configure(function(){app.use(allowCrossDomain);});

app.get('/:count', function(req, res, next){
    //var request = require('request');
    //var resp = request.get(feed_url).auth('j2r@srijan.in', '123', false);
	parser.parseURL(feed_url, options, function(err, out){
      if(out == null){console.log("Request failed !!");return false;}
	  var count = req.params.count;
	  var article = count != "all" ? out.items[count] : out.items;
	  res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(article, null, 2));
    });
});

app.get('/offset/:slug/:count', function(req, res, next){
    //var request = require('request');
    //var resp = request.get(feed_url).auth('j2r@srijan.in', '123', false);
    parser.parseURL(feed_url, options, function(err, out){
      if(out == null){console.log("Request failed !!");return false;}
      var count = req.params.count;
      var slug = req.params.slug;
      //console.log("count:"+count+" slug:"+slug);
      var offsetItems = takeStartingAt(out.items, slug);
      console.log();
      var article = count != "all" ? offsetItems[count] : offsetItems;
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(article, null, 2));
    });
});

app.listen(3000, '127.0.0.1');


