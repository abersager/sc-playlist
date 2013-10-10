define([
  'backbone',
  'soundcloud'
],
function (Backbone, SoundCloud) {
  var Track = Backbone.Model.extend({

    SoundCloud: SoundCloud,

    /**
     * Updates track details from SoundCloud and initialises soundmanager
     * for the track object. On mobile, play() needs to be called in
     * immediate reaction to user interaction - a deferred callback does not
     * work. The sound object needs to be available for all track objects
     * to allow users to tap on any track in the playlist.
     */
    initialize: function (attrs, options) {
      var url = attrs['uri'] || attrs['permalink_url'];

      this.SoundCloud.get('/resolve', { url: url }, _.bind(function (track) {
        if (track.errors) {
          if (this.collection) {
            this.collection.remove(this);
          }
          this.set('invalid', true);
        } else {
          var id = track.soundcloudId = track.id;
          delete track.id;
          this.SoundCloud.stream('/tracks/' + id, _.bind(function (sound) {
            this.sound = sound;
            this.set(track);
          }, this));
        }
      }, this));
    }
  });

  return Track;
});
