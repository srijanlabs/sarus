# node-rss

A simple node.js RSS feed builder

## Why another RSS module?

None of the other node.js RSS modules that I could find supported the flexibility that I wanted or were too slow. Additionally, many of them seemed overly complex when all we're doing here is building a RSS feed. Not rocket science.

## Install

    npm install node-rss

## Dependencies

node-rss uses the libxmljs library to construct the actual feed.
Unfortunately, some of the features of the library that are needed are only available in the current master branch. You will need to download the libxmljs source, compile, and install it yourself. Fortunately, this is fairly straight forward. https://github.com/polotek/libxmljs/

You will also need to have the libxml2 AND libxml2-dev packages installed on your system.

## Usage
    
    // this exposes two methods: createNewFeed and getFeedXML
    var rss = require('node-rss');

    // first we create a "feed" object that will define your feed
    // method signature: function createNewFeed(title, link, desc, author, feedLink, options)
    // title : title of your feed
    // link : link to your website
    // desc : description of your feed
    // author : author of the feed
    // feedLink : link to the feed
    // options : additional options, explained below
    var feed = rss.createNewFeed('Blog Most Recent', 'http://someurl.com/',
                                'Most recent blog entries from blog',
                                'EJ Bensing',
                                'http://someurl.com/rss/MostRecent.xml', 
                                {'CustomTag' : 'This is a custom tag under the channel tag!' });

    // the additional options parameter can essentially be used to 
    // arbitrarily change the xml that will be created or other defaults.
    // currently, it only supports basic tags, where it will take a 
    // key : value and turn it into <key>value</key>, but future releases
    // will contain the ability to specify attributes

    //next, we need to add some items to the feed
    // create some dummy data to loop over...
    var blogs = [
      {title: 'blog post 1', url : 'http://someurl.com/blog1', pubDate : new Date(), description: 'this is a description' },
      {title: 'blog post 2', url : 'http://someurl.com/blog2', pubDate : new Date(), description: 'this is a description' },
      {title: 'blog post 3', url : 'http://someurl.com/blog3', pubDate : new Date(), description: 'this is a description' },
      {title: 'blog post 4', url : 'http://someurl.com/blog4', pubDate : new Date(), description: 'this is a description' },
      {title: 'blog post 5', url : 'http://someurl.com/blog5', pubDate : new Date(), description: 'this is a description' },
      {title: 'blog post 6', url : 'http://someurl.com/blog6', pubDate : new Date(), description: 'this is a description' },
    ];

    
    // add some items to the feed
    // each feed object has a function addNewItem which should be used for adding new items
    // method signature : function addNewItem(itemTitle, itemLink, pubDate, description, fields)
    // itemTitle : Title of the item
    // itemLink : Link to the item
    // pubDate : Date the item was created/published
    // description : description of item
    // fields : functions exactly like the "options" parameter of createNewFeed, 
    // allows the user to add arbitrary tags to an item
    blogs.forEach(function (blog) {
        feed.addNewItem(blog.title, blog.url, blog.pubDate, blog.description, {});
    });

    // now to get the XML simply call the getFeedXML function
    var xmlString = rss.getFeedXML(feed);

## Other

The "feed" object has a defaults property. Inside this is a dictionary of default values. 

    cdata : a list of tag names whose content should be "escaped" in CDATA tags

## tests

In the process of building these... 

## TODO

    - add tests
    - add support for attributes on custom tags
    - add some express.js middleware
    - ?? give me suggestions
