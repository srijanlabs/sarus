l# Sarus <sup><small>In Progress</small></sup>


Sarus is a minimalistic front-end framework that lets media sites and blogs create an SEO-friendly continuous scroll of the content they have. Sarus implements a UX similar to [Quartz](http://qz.com/), and allows for bringing in new content seamlessly on scroll instead of tap/click. Couple that with context-based URL switching, and you got yourself a SEO winner! Sarus is perfect for your blog and any scenario where a continuous flow of content is needed.

Made with love by [Joseph Dias](josephdias92.github.io)

Contributor can please add your name here

## Features

### Fast
Sarus loads data incrementally as you scroll.
### Purely front-end
--add description 
### Easy to set up
--need to implement this
### SEO friendly infinite scroll
Along with infinite scroll, Sarus maintains URL paths of posts for the browser. This allows search engines to index your content without hiccups.
### Infinitely customizable
Being based on AngularJS, Sarus allows any level of customization in design and functionality. It is as easy to customize as it is to set up.
### Maintains browser history
Sarus maintains the browser history of bowsers using HTML5 History API.This lets user bookmark and find visited articles very easily.

### Modification without coding


## Requirements



## Technology Stack

<big>Angular.js</big> - Sarus takes advantage of Angular.js JavaScript MV* framework to provide a great UX to the users.

## Installation & configurations


>npm install
>bower install

This will install all the dependencies requird for Sarus to run.
[In case of an error, it could be because you don't have Node Package Manager installed on your machine or you need to run with superuser as sudo npm install]

After the installation of dependencies, you can directly run the server as

>gulp serve



###For Configuration

before getting started please create google double click for publisher account and copy your network code in constant file (adInfo.networkCode).

Sarus will run with its default setup. But you can configure it by opening up the configuration file located in src/app/config.js

##Screenshot


##Todo

 <ul>
  <li>Implement Google analytics</li>
  <li>Create Configuration Provider to override constant values</li>
 </ul>


####Developed by
[Joseph Dias](josephdias92.github.io)
