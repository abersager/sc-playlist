# SoundCloud Playlist #

Demo app that allows you to create a playlist from [SoundCloud](https://soundcloud.com) track pages and play them in your browser.

## Getting started ##

- Install dependencies: `npm install`
- In order to run tests from the command line, you also need [PhantomJS](http://phantomjs.org/download.html)
- Run app: `node app.js`. The app is served at `http://localhost:3000`

The node process serves static JS and CSS files and routes all other paths to index.html.

## Tests ##

### Browser ###

When app is run via `node app.js`, tests are available at `http://localhost:3000/spec/index.html`


### Command line ###

Make sure `phantomjs` is available in your `$PATH`. Then run `spec/testrunner.sh`.


## Tested ##

 - Chrome 30
 - Safari 6.0
 - Firefox 24
 - Internet Explorer 10
 - Mobile Safari 7.0
 - Chrome for iOS 30
 - Chrome for Android 30
