## Web

This repository contains code and markup for Asheville's main user interface, built within the [EmberJS framework](http://emberjs.com/) and intended primarily for hosting at [asheville.io](http://asheville.io).

The interface enables Asheville users to connect their Dropbox accounts, select content sources and types for synchronization, and monitor the progress of that synchronization.

This front-end web application is intended to work with a server-side API hosted on the same domain. However, since that API is still in development, the application currently relies on a client-side model that simulates the server-side one.

This facilitates development and enables user experience testing without reliance on the API's availability. But it also means that the application is solely ready for development and testing purposes at this time.

## Preview

The web app is still undergoing initial development and is therefore not fully functional yet. However, latest versions of the code are pushed to GitHub Pages and can be previewed at [asheville.github.io/web](http://asheville.github.io/web). Built-in simulations make it possible to experience what it might be like to set up a real account with Asheville.

## Todos

Todo items for this code base are organized in [a public pivotal tracker project](https://www.pivotaltracker.com/s/projects/951914).

## Building with Grunt

The application code is stored in the `app` directory. To build it for either development or deployment purposes, first install [Node](http://nodejs.org/) and run `npm install` in the root directory to install Grunt and other node modules on which it depends.

Then install the [Grunt](https://github.com/gruntjs/grunt) command line interface:

`sudo npm install -g grunt-cli`

And depending on what you want to do:

- **Development Dry Run**: run `grunt dev-dry` to compile the code for development purposes. This compiled code can be found in the `dev` directory.

- **Development**: run `grunt dev` to compile the code for development purposes and start a web server to view it locally on your machine. See the grunt output for the address and port to use.

-  **Deployment Dry Run**: run `grunt deploy-dry` to compile code for deployment purposes that can be pushed to a server manually or simply checked for accuracy before deployment below. This compiled code can be found in the `public` directory.

- **Deployment Testing**: run `grunt deploy-test` to compile code for deployment and start a web server to view it locally on your machine. See the grunt output for the address and port to use.

-  **Deployment**: run `grunt deploy` to compile code for deployment then commit and push it to the `gh-pages` branch for hosting on GitHub Pages.