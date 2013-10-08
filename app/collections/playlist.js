define([
  'backbone',
  'models/track',
  'backbone-localstorage'
],
function (Backbone, Track) {
  var Playlist = Backbone.Collection.extend({

    localStorage: new Backbone.LocalStorage("Playlist"),

    model: Track,

    initialize: function () {
      this.on('remove', function (model, collection, options) {
        model.destroy();
      }, this);
      this.on('add reset sort', this.save, this);
    },

    reset: function (models, options) {
      // preserve current selection if possible
      var selectedModel = this.selectedModel;

      this.invoke('destroy');

      Backbone.Collection.prototype.reset.apply(this, arguments);

      var index = this.indexOf(selectedModel);
      if (index != -1) {
        // restore selection of previously selected model
        this.select(index, { silent: true });
      }
    },

    save: function () {
      this.invoke('save');
    }
    

  });

  return Playlist;
});
