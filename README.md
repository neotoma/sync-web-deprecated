This repository contains the client-side web application for [Asheville](http://asheville.io).

The app empowers someone to connect an online storage service, select the sources and content types they want to synchronize to that storage, and manage the state of synchronization.

This app is designed to work with [Asheville Sync](https://github.com/asheville/sync) for server-side data management.

## Product Management

Product initiatives for this app are organized on the [Asheville Product Sprints](https://trello.com/b/gN599TRG/product-sprints) board on Trello, and development tasks are organized in the [Asheville Web](https://www.pivotaltracker.com/s/projects/951914) project on Pivotal Tracker.

## Environment Variables

The application uses the following environment variables for its configuration during the build process.

#### Required

```
export ASHEVILLE_WEB_ADAPTER_HOST=XXXX
```

Set the host for the Asheville Sync service here (see Ember's [DS.RESTAdapter](http://emberjs.com/api/data/classes/DS.RESTAdapter.html#toc_host-customization) documentation).

#### Optional

```
export ASHEVILLE_WEB_ADAPTER_NAMESPACE=XXXX
export ASHEVILLE_WEB_LOG_TRANSITIONS=XXXX
export ASHEVILLE_WEB_LOG_TRANSITIONS_INTERNAL=XXXX
export ASHEVILLE_WEB_LOG_RESOLVER=XXXX
```

Set an adapter namespace here if Asheville Sync is namespaced with a base path at the host above (see Ember's [Endpoint Path Customization](http://emberjs.com/api/data/classes/DS.RESTAdapter.html#toc_endpoint-path-customization) documentation).

Set any of these log variables to `true` to enable more detailed Ember logging in the console (see Ember's [Log Router Transitions](http://emberjs.com/guides/understanding-ember/debugging/#toc_log-router-transitions) and [Turn on Resolver Resolution Logging](http://emberjs.com/guides/understanding-ember/debugging/#toc_turn-on-resolver-resolution-logging) documentation).

## Build, Test and Deploy

To build and test the app for either development or production purposes, follow these instructions from the repo's root directory:

1. Install [Node.js](http://nodejs.org/), which powers the repo's development tools such as `npm`
2. Run `npm install` to install Grunt and other node modules on which the build and testing processes depend. 
3. Install [Bower](http://bower.io) and run `bower install` to install application dependencies.
4. Install the [Grunt](https://github.com/gruntjs/grunt) command line interface with `sudo npm install -g grunt-cli`

Then depending on what you want to do:

- **Development Build**: run `grunt dev-build` to build the app in the `public` directory for development purposes (i.e. code is not minified, among other things).

- **Development**: run `grunt dev` to build the app and start a web server to run it locally for manual development testing purposes. See output in the console for which address and port to use.

-  **Production Build**: run `grunt prod-build` to build the app in the `public` directory for production purposes (i.e. code is minified, among other things).

- **Production**: run `grunt prod` to build the app and start a web server to run it locally for manual production testing purposes. See output in the console for which address and port to use.

- **Deployment**: run `grunt deploy` to build the app for production then commit and push it to the remote `gh-pages` branch for hosting on GitHub Pages.