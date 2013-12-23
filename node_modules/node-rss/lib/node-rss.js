
/**
  * this is an RSS module for node. 
  **/

var libxml = require('libxmljs');


  // this function will return a "Feed" object, which can then have items added to it
exports.createNewFeed = function (title, link, desc, author, feedLink, options) {
    var feed = {};
    feed.title = title;
    feed.link = link;
    feed.description = desc;
    feed.defaults = { author: author, cdata : ['description', 'title'] };
    feed.items = [];
    feed.language = 'en-US';
    feed.feedLink = feedLink;
    for (var opt in options) {
        feed[opt] = options[opt];
    }

    feed.addNewItem = function (itemTitle, itemLink, pubDate, description, fields) {
        var item = {
            title: itemTitle,
            link: itemLink,
            pubDate: pubDate,
            description: description,
            guid: itemLink,
            author: this.defaults.author
        };
        for (var field in fields) {
            item[field] = fields[field];
        }

        this.items.push(item);
    };

    return feed;
};

exports.getFeedXML = function (feed) {
    var doc = new libxml.Document("1.0", "utf-8");
    var root = doc.node('rss');
    var rssNodeProps = {
        'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        'xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
        'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
        'xmlns:atom': 'http://www.w3.org/2005/Atom',
        'xmlns:sy': 'http://purl.org/rss/1.0/modules/syndication/',
        'xmlns:slash': 'http://purl.org/rss/1.0/modules/slash/'
    };
    root.attr({ 'version': '2.0' });
    for (var i in rssNodeProps) {
        root.attr(i, rssNodeProps[i]);
    }
    var channel = root.node('channel');
    for (var nd in feed) {
        if (nd != 'items' && nd != 'defaults' && nd != 'feedLink' && nd != 'addNewItem') {
            if (feed.defaults.cdata.indexOf(nd) == -1) {
                channel.node(nd, feed[nd]);
            } else {
                channel.node(nd).cdata(feed[nd]);
            }
        }
    }
    var aLink = channel.node('atom:link');
    aLink.attr({ href: feed.feedLink, rel: 'self', type: 'application/rss+xml' });
    var now = new Date();
    channel.node('lastBuildDate', now.toString());
    
    feed.items.forEach(function (item) {
        var itemNode = channel.node('item');
        
        for (var nd in item) {
            if (feed.defaults.cdata.indexOf(nd) == -1) {
                itemNode.node(nd, item[nd]);
            } else {
                itemNode.node(nd).cdata(item[nd]);
            }
        }
    });
    return doc.toString();
};
