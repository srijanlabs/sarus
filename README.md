# Sarus_v2
Developer : [Ajay Singh](http://about.me/meajaysingh)
### Check out the [Live Demo](http://)

Sarus is a minimalistic front-end framework for when you need a SEO-friendly continuous scroll across a lot of content. Sarus implements a UX similar to [Quartz](http://qz.com/), and allows for bringing in new content seamlessly on scroll instead of tap/click. Couple that with context-based URL switching, and you got yourself a SEO winner! Sarus is perfect for your blog and any scenario where a continuous flow of content is needed.

Made with love by [@adityaraj](https://twitter.com/adityaraj),[@ajsingh92](https://twitter.com/ajsingh92), [@fotuzlab](https://twitter.com/fotuzlab) and [@ray1claw](https://twitter.com/ray1claw)

## Features

### Fast
Sarus loads data incrementally as you scroll, hence speed to load any post is equal to loading the first post.
### Purely front-end
Sarus is completely independent of the way data is stored in the back-end. It uses an API or RSS feeds to fetch the posts providing complete abstraction between front-end and back-end. This also makes it compatible with apps that use mobile-native/content management/proprietary solutions to store data.
### Easy to set up
Sarus comes with extensive inline documentation to help you integrate it into your system with ease. HTML partials are easy to identify and maintain.
### SEO friendly infinite scroll
Along infinite scroll, Sarus maintains URL paths of posts for the browser. This allows search engines to index your content without hiccups.
### Infinitely customizable
Being based on AngularJS, Sarus allows any level of customization in design and functionality. It is as easy to customize as it is to set up.
### Responsive
Sarus uses the Sass version of Zurb Foundation, and comes responsive out of the box. You can easily either extend it or replace the whole styling component to make it look and feel like you want.
### Maintains browser history
It maintains users' browser history using HTML5 History API. Bookmark and find your visited articles with ease.
### Sharethis
Sharethis comes bundled with it to allow easy sharing across social media.

## Requirements
Minimum requirement is following tags in feed XML:

`<title></title>`

`<link></link>`

`<description></description>`

For an API call, following urls are required:

> /api/article/1

> /api/slugs/:offset/:count

_These urls are defined in the RSS server script in the bundle. See below._

## Installation
Sarus uses the data that you expose it via an API or RSS feed.

#### Using API
Sarus can be used with custom API. This API should return content in JSON with minimum of following keys:

> title

> link

> description

Developed by
[@ajsingh92](https://twitter.com/ajsingh92)
[@adityaraj](https://twitter.com/adityaraj)
[@fotuzlab](https://twitter.com/fotuzlab)
[@ray1claw](https://twitter.com/ray1claw)
