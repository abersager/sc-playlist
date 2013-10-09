module.exports = function(grunt) {
  require('./grunt/server')(grunt);

  grunt.initConfig({

    server: {
      port: process.env.PORT || "8000",
      host: "0.0.0.0",
      files: {
        "spec.js": "test/spec.js"
      },
      base: 'test/',
      folders: {
        "app": "app",
        "spec": "spec",
        "styles": "styles"
      }
    }

  });
};

