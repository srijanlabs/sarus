var rss = require('./../lib/node-rss.js');


// create the feed object
// arg[0] : Title
// arg[1] : Link to Web Site
// arg[2] : Feed Description
// arg[3] : Author
// arg[4] : Link to Feed
// arg[5] : Options
var feed = rss.createNewFeed('Blog Most Recent', 'http://someurl.com/',
                              'Most recent blog entries from blog',
                              'EJ Bensing',
                              'http://someurl.com/rss/MostRecent.xml', {'CustomTag' : 'This is a custom tag under the channel tag!' });

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
blogs.forEach(function (blog) {
    feed.addNewItem(blog.title, blog.url, blog.pubDate, blog.description, {});
});

// get the actual XML for the feed
console.log("RSS Content: %s", rss.getFeedXML(feed));
