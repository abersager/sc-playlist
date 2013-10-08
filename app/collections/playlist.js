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
    },

    /**
     * Changes currently selected item and notifies listeners
     * @param {Number} [index=undefined] Index of item to select. Leave empty to unselect
     * @param {Object} [options={}] Options
     * @param {Boolean} [options.silent=false] Suppress change:selected event
     */
    select: function(index, options) { 
      if(index === this.selectedIndex) {
        return;
      }
      
      options = _.extend({
        silent: false
      }, options);

      var model = this.models[index];

      if (this.length) {
        this.selectedModel = model;
        this.selectedIndex = index;
      } else {
        this.selectedModel = null;
        this.selectedIndex = null;
      }

      if (!options.silent) {
        this.trigger("change:selected", model, index);
      }
    }
    

  });

  return Playlist;
});
