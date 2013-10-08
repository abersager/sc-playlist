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
      if (!_.isArray(models)) {
        models = models ? [models] : [];
      }

      // preserve current selection if possible
      var selectedModel = this.selectedModel;

      // remove elements from storage that are not in the new collection
      this.each(function (model) {
        if (!_.contains(models, model)) {
          model.destroy();
        }
      });

      Backbone.Collection.prototype.reset.apply(this, arguments);

      // restore selection of previously selected model
      var index = this.indexOf(selectedModel);
      if (index === -1) {
        index = null;
      }
      this.select(index, { silent: index !== null });
    },

    remove: function (models, options) {
      // preserve current selection if possible
      var selectedModel = this.selectedModel;

      Backbone.Collection.prototype.remove.apply(this, arguments);

      // restore selection of previously selected model
      var index = this.indexOf(selectedModel);
      if (index === -1) {
        index = null;
      }

      this.select(index, { silent: index !== null });
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
    },

    previous: function (options) {
      options = _.extend({
        wrapAround: false
      }, options);

      var index;
      if (!_.isNumber(this.selectedIndex)) {
        index = this.length - 1;
      } else if (options.wrapAround) {
        index = (this.length + this.selectedIndex - 1) % this.length;
      } else {
        index = Math.max(this.selectedIndex - 1, 0);
      }
      this.select(index);
    },
    
    next: function (options) {
      options = _.extend({
        wrapAround: false
      }, options);

      var index;
      if (!_.isNumber(this.selectedIndex)) {
        index = 0;
      } else if (options.wrapAround) {
        index = (this.selectedIndex + 1) % this.length;
      } else {
        index = Math.min(this.selectedIndex + 1, this.length - 1);
      }
      this.select(index);
    }
    

  });

  return Playlist;
});
