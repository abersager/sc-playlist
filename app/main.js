require.config({
  
  nodeRequire: require,
  
  catchError: {
    define: true
  },
  
  paths: {
    jquery: "http://code.jquery.com/jquery-2.0.0.min",
    jquerymockjax: "//cdnjs.cloudflare.com/ajax/libs/jquery-mockjax/1.5.1/jquery.mockjax",
    underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min",
    backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min",
    'backbone-localstorage': './lib/backbone.localStorage',
    moment: "//cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment.min",
    tpl: "./lib/tpl",
    soundcloud: "http://connect.soundcloud.com/sdk",
    'soundcloud-widget': 'https://w.soundcloud.com/player/api'
  },

  shim: {
    backbone: {
      deps: ["underscore", "jquery", "jquerymockjax"],
      exports: "Backbone"
    },

    moment: {
      exports: "Moment"
    },
    
    jquerymockjax: {
      deps: ['jquery']
    },

    soundcloud: {
      exports: 'SC'
    }
  }

});
