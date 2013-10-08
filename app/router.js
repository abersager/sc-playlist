define([
  'backbone',
  'views/404'
],
function (Backbone, View404) {
  var Router = Backbone.Router.extend({

    routes: {
      "": "index",
      "*url": "show404Page"
    },

    index: function () {
    },

    show404Page: function() {
      var view = new View404({
        el: $('#main')
      });
      view.render();
    },

    start: function() {
      Backbone.history.start({
        pushState: true,
        root: '/'
      });

      // on every click, check if it's an href that can be handled by the router
      $(document.body).on('click', 'a', function(event) {
        // clean leading/trailing slashes
        var href = $(this).attr('href').replace(/^\/+/, '').replace(/\/+$/, '');
     
        _(Backbone.history.handlers).chain().pluck('route').each(function(route) {
          if (route.test(href)) {
            event.preventDefault();
            Backbone.history.navigate(href, {trigger: true});
          }
        });
      });

    }

  });

  return Router;
});
