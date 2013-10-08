# SoundCloud Playlist #

Demo app that allows you to create a playlist from [SoundCloud](https://soundcloud.com) track pages and play them in your browser.

## Getting started ##

- Install dependencies: `npm install`
- Run app: `grunt server`. The app is served at `http://localhost:8000`
- In order to run tests from the command line, you also need [PhantomJS](http://phantomjs.org/download.html)

## Tests ##

### Browser ###

When app is run via `grunt server`, tests are available at `http://localhost:8000/spec/index.html`


### Command line ###

Make sure `phantomjs` is available in your `$PATH`. Then run `spec/testrunner.sh`.


## Tested ##

 - Chrome 29
 - Safari 6.0
 - Firefox 23
 - Internet Explorer 10
 - Mobile Safari 6.1
