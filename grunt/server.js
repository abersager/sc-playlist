/*
 * Grunt Task File
 * ---------------
 *
 * Task: Server
 * Description: Serve the web application.
 * Dependencies: express
 *
 */

 module.exports = function(grunt) {

  var _ = grunt.util._;

  // Shorthand Grunt functions
  var log = grunt.log;

  grunt.registerTask("server", "Run development server.", function(prop) {
    var options;
    var props = ["server"];

    // Keep alive
    var done = this.async();

    // If a prop was passed as the argument, use that sub-property of server.
    if (prop) { props.push(prop); }

    // Defaults set for server values
    options = _.defaults(grunt.config(props) || {}, {
      favicon: "./favicon.ico",
      index: "./index.html",

      port: process.env.PORT || 8000,
      host: process.env.HOST || "127.0.0.1"
    });

    options.folders = options.folders || {};

    // Ensure folders have correct defaults
    options.folders = _.defaults(options.folders, {
      app: "./app",
      assets: "./assets",
      dist: "./dist"
    });

    options.files = options.files || {};

    // Ensure files have correct defaults
     options.files = _.defaults(options.files, {
       "app/config.js": "app/config.js"
    });

    // Run the server
    server(options);

    // Fail task if errors were logged
    if (grunt.errors) { return false; }
    
    var url = (options.https ? 'https' : 'http') + "://" + options.host + ":" + options.port;
    log.writeln("Listening on " + url);
  });
  
  var server = function(options) {
    // Require libraries.
    var fs = require("fs");
    var path = require("path");
    var express = require("express");
    var http = require('http');
    var https = require('https');
    
    // If the server is already available use it.
    var site = options.server ? options.server() : express();
    
    // Allow users to override the root.
    var root = _.isString(options.root) ? options.root : "/";

    // Map static folders.
    Object.keys(options.folders).sort().reverse().forEach(function(key) {
      site.get(root + key + "/*", function(req, res, next) {
        // Find filename.
        var filename = req.url.slice((root + key).length);

        res.sendfile(path.join(options.folders[key] + filename));
      });
    });

    // Map static files.
    if (_.isObject(options.files)) {
      Object.keys(options.files).sort().reverse().forEach(function(key) {
        site.get(root + key, function(req, res) {
          return res.sendfile(options.files[key]);
        });
      });
    }

    // Serve favicon.ico.
    site.use(express.favicon(options.favicon));
    
    // Ensure all routes go home, client side app..
    site.all("*", function(req, res) {
      fs.createReadStream(options.index).pipe(res);
    });
    
    // Instantiate HTTP or HTTPS server
    if (options.https) {
      // http://panoptic.com/wiki/aolserver/How_to_generate_self-signed_SSL_certificates
      var params = {
        cert: fs.readFileSync('grunt/cert/certificate.pem').toString(),
        key: fs.readFileSync('grunt/cert/key.pem').toString()
      };
      var server = https.createServer(params, site);
    } else {
      var server = http.createServer(site);
    }
    
    server.listen(options.port, options.host);
  };
};
