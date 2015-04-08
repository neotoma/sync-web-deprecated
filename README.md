This repository contains the client-side web application for [Asheville](http://asheville.io).

The app empowers someone to connect an online storage service, select the sources and content types they want to synchronize to that storage, and manage the state of synchronization.

This app is designed to work with [Asheville Sync](https://github.com/asheville/sync) for server-side data management.

## Environment Variables

The application requires SSL and uses the following environment variables for its configuration during build, testing, and deployment processes.

#### Required for Local Development

```
export ASHEVILLE_WEB_PORT=<port on which to run app locally>
export ASHEVILLE_WEB_ADAPTER_HOST=<host for the asheville sync service for local app>
export ASHEVILLE_WEB_SSL_KEY=<path to file with SSL key>
export ASHEVILLE_WEB_SSL_CRT=<path to file with SSL certificate>
export ASHEVILLE_WEB_SSL_INT_CRT=<path to file with SSL intermediate CA certificate>
```

#### Required for Remote Deployment

```
export ASHEVILLE_WEB_DEPLOY_ADAPTER_HOST=<host for the asheville sync service for deployed app>
export ASHEVILLE_WEB_DEPLOY_HOST=<host for deploying app>
export ASHEVILLE_WEB_DEPLOY_HOST_USERNAME=<host username for deploying app>
export ASHEVILLE_WEB_DEPLOY_HOST_DIR=<host directory for deploying app>
```

#### Optional

```
export ASHEVILLE_WEB_ADAPTER_NAMESPACE=<namespace if sync service is namespaced with a base path>
export ASHEVILLE_WEB_LOG_TRANSITIONS=<whether to log ember transitions>
export ASHEVILLE_WEB_LOG_TRANSITIONS_INTERNAL=<whether to log ember internal transitions>
export ASHEVILLE_WEB_LOG_RESOLVER=<whether to log ember resolver>
```

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

- **Deployment**: run `grunt deploy` to build the app for production and push it to a remote host.