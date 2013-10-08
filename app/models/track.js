define([
  'backbone',
  'soundcloud'
],
function (Backbone, SoundCloud) {
  var Track = Backbone.Model.extend({

    SoundCloud: SoundCloud,

    initialize: function (attrs, options) {
      var url = attrs['uri'] || attrs['permalink_url'];

      this.SoundCloud.get('/resolve', { url: url }, _.bind(function (track) {
        track.soundcloudId = track.id
        delete track.id;
        this.set(track);
      }, this));
    }
  });

  return Track;
});
