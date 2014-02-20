# About

Sarus is a frontend framework based on AngularJS to display any number of posts without using a pager. It implements an infinite scroll but maintains url of the post in the browser's address bar. A continous mapping of urls allows search engines to count page hits accurately and also allow users to easily share posts.

# Features

## Fast
It loads data along scrolling. Hence speed to load nth post is equal to loading first post.
## Purely frontend
It is completely independent of the way data is stored in the backend. It uses API or RSS feeds to fetch the posts providing complete abstraction between frontend and backend. This also makes it compatible to use with apps that use mobile/CMS/propreitary solutions to store data.
## Easy to set up
It comes with enough inline documentation for anyone to start using. HTML partials are easy to maintain and indentify.
## SEO friendly infinite scroll
Along infinite scroll, it maintains url paths of posts in browser's address bar. This allows search engines to index your content regularly.
## Infinitely customizable
Being based on AngularJS, it allows any level of customization in design and functionality. It is as easy to customize as it is to set up.
## Responsive
The framework uses Zurb Foundation. It is responsive OOB.
## Maintains browser history
It maintains users' browser history using HTML5 History API. Bookmark and find your visited articles with ease. 
## Sharethis
Sharethis comes bundled with it to allow easy sharing across social media.

# Requirements

Minimum requirement is following tags in feed XML:

`<title></title>`

`<link></link>`

`<description></description>`

For an API call, following urls are required:

> /:count

> /offset/:slug/:count

> /slugs/:offset/:count

_These urls are defined in the RSS server script in the bundle. See below._

## Installation

Data is fed into Sarus through API or RSS.

## Using Feeds
A NodeJS script to convert RSS feeds into required format comes in the bundle.

1. Replace line 22 with feed url at server/RSS/app.js.

2. Modify the endpoint to Node server's path on line 9 at js/controllers.js e.g. http://localhost:3000

## Using API
Sarus can be used with custom API. This API should return content in JSON with minimum of following keys:

> title

> link

> description

1. Modify the endpoint to the address of API calls on line 9 at js/controllers.js e.g. http://example.com. Do not add trailing slash.


Follow us on [Twitter](https://twitter.com/projectsarus) for updates


Developed by [Aditya](https://twitter.com/adityaraj),
[Arijit](https://twitter.com/fotuzlab) and 
[Ravish](https://twitter.com/ray1claw)

