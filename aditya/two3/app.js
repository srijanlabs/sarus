var parser = require('rssparser');
var http = require('http');
var express = require('express');
var feed_url = "http://staging.srijan7v2.srijan-sites.com/rss/";
var options = {'auth': {'user': "staging", 'pass': "srijan", 'sendImmediately': false}};

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

var feed = null;

function getfeed(callback){
  if(feed == null){
    parser.parseURL(feed_url, options, function(err, out){
      callback(err, out);
      feed = out;
      console.log('fetched');
      return false;
    });
  }else{callback(false, feed); console.log('cached');}
}

app.configure(function(){app.use(allowCrossDomain);});

app.get('/clear', function(req, res,next){
  feed = null;
  getfeed(function(err, out){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(out, null, 2));
    });
  return false;
});


app.get('/:count', function(req, res, next){
    //var request = require('request');
    //var resp = request.get(feed_url).auth('j2r@srijan.in', '123', false);
	getfeed(function(err, out){
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
    getfeed(function(err, out){
      if(out == null){console.log("Request failed !!");return false;}
      var count = req.params.count;
      var slug = req.params.slug;
      //console.log("count:"+count+" slug:"+slug);
      var offsetItems = takeStartingAt(out.items, slug);
      var article = count != "all" ? offsetItems[count] : offsetItems;
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(article, null, 2));
    });
});

app.get('/slugs/:offset/:count', function(req, res, next){
  var data = [];
  getfeed(function(err, out){
      if(out == null){console.log("Request failed !!");return false;}
    var count = req.params.count;
    var items = out.items;
    var offset = 0;
    for(var i = offset; i < items.length; i++){
      var current = items[i];
      data.push({'title': current.title, 'url': current.url, 'index': i});
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(data, null, 2));
    });
});

app.listen(3000, '127.0.0.1');