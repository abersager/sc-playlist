module.exports = function(grunt) {
  require('./grunt/server')(grunt);

  grunt.initConfig({

    server: {
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

