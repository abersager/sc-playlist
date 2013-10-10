# SoundCloud Playlist #

Demo app that allows you to create a playlist from [SoundCloud](https://soundcloud.com) track pages and play them in your browser.

The application runs fully client side but contains a basic Node.js / Express server that serves static JS and CSS files and routes all other paths to index.html.

You can add tracks from SoundCloud through a bookmarklet. To do so, visit a track page on SoundCloud and click the bookmark.

All playlist changes are persisted in localstorage.


## Getting started ##

- Install dependencies: `npm install`
- In order to run tests from the command line, you also need [PhantomJS](http://phantomjs.org/download.html)
- Run app: `node app.js`. The app is served at `http://localhost:3000`


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


## TODO ##

 - Created optimised r.js build for production use
 - Minify CSS for production use
 - Automatically update playlist from localstorage in case tracks were added in another tab / window.
