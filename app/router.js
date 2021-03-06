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
      "add": "add",
      "*url": "show404Page"
    },

    /**
     * Shows currently playing track and playlist
     */
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

    /**
     * Adds track with provided URL to playlist or show instructions on how
     * to add tracks.
     */
    add: function (url) {
      var track;
      if (url) {
        this.listenToOnce(this.playlist, 'add', function (model) {
          track = model 
        });
        this.playlist.add({
          permalink_url: url
        });
      }

      var view = new AddView({
        el: $('#main'),
        model: track,
        router: this
      });
      view.render();
    },

    /**
     * Populates playlist with tracks from a pre-defined playlist
     * for testing purposes
     */
    addRandomPlaylist: function () {
      SoundCloud.get('/playlists/1.json', _.bind(function (playlist) {
        var tracks = _.map(playlist.tracks, function (track) {
          return {
            permalink_url: track.permalink_url
          };
        });
        this.playlist.reset(tracks);
        this.navigate('/');
      }, this));
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
