Dashboard
=========

This repository contains code and markup for Asheville's main user interface, built within the [EmberJS framework](http://emberjs.com/) and intended primarily for hosting at [asheville.io](http://asheville.io).

The interface enables Asheville users to connect their Dropbox accounts, select content sources and types for synchronization, and monitor the progress of that synchronization.

This front-end web application is intended to work with a server-side API hosted on the same domain. However, since that API is still in development, the application currently relies  on a client-side model that simulates the server-side one with [Mockjax](https://github.com/appendto/jquery-mockjax).

This facilitates development and enables user experience testing without reliance on the API's availability. But it also means that the application is solely ready for development and testing purposes at this time.

Todos
=========

Todo items for this code base are organized in [a public pivotal tracker project](https://www.pivotaltracker.com/s/projects/951914).

Running
=========

Since this repository consists almost entirely of client-side files such as HTML templates and JavaScript scripts, the running procedure is *almost* as simple as opening the root index.html file.

However, since the EmberJS code triggers Ajax calls to local files for compilation purposes, the application must be run with a web server. [Connect](https://github.com/senchalabs/connect) provides a simple web server that can be used this purpose, and its dependencies are already included in the .gitignore file. You can consult [quick-start instructions for Connect](http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server).