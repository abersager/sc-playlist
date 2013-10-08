define([
  'backbone',
  'soundcloud',
  'collections/playlist',
  'views/playlist',
  'views/player',
  'views/add',
  'views/404'
],
function (Backbone, SoundCloud, Playlist, PlaylistView, Player, AddView, View404) {
  var Router = Backbone.Router.extend({

    initialize: function () {
      SoundCloud.initialize({
        client_id: 'f08221ce848e18e10ac59d9b79bc5d1d'
      });

      var playlist = this.playlist = new Playlist();
      playlist.fetch();
    },

    routes: {
      "": "index",
      "add/*url": "add",
      "*url": "show404Page"
    },

    index: function () {

      var el = $('#main').empty();

      var player = new Player({
        collection: this.playlist
      });
      el.append(player.$el);
      player.render();

      var playlistView = new PlaylistView({
        collection: this.playlist
      });
      el.append(playlistView.$el);
      playlistView.render();
    },

    add: function (url) {
      var track;
      this.listenToOnce(this.playlist, 'add', function (model) {
        track = model 
      });
      this.playlist.add({
        permalink_url: url
      });

      var view = new AddView({
        el: $('#main'),
        model: track
      });
      view.render();
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
