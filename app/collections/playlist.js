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

    /**
     * Resets collection, updates localstorage accordingly. Preserves current
     * selection if the selected item is contained in the new set of models.
     */
    reset: function (models, options) {
      if (!_.isArray(models)) {
        models = models ? [models] : [];
      }

      // preserve current selection if possible
      var selectedModel = this.selectedModel;

      // remove elements from storage that are not in the new collection
      var toDestroy = [];
      this.each(function (model) {
        if (!_.contains(models, model)) {
          toDestroy.push(model)
        }
      });
      _.invoke(toDestroy, 'destroy');

      Backbone.Collection.prototype.reset.apply(this, arguments);

      // restore selection of previously selected model
      var index = this.indexOf(selectedModel);
      if (index === -1) {
        index = null;
      }
      this.select(index, { silent: index !== null });
    },

    /**
     * Removes item from collection and localstorage. Preserves current
     * selection if the selected item is not the removed one.
     */
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

    /**
     * Persists all items to localstorage
     */
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
      options = _.extend({
        silent: false
      }, options);

      if (index === this.selectedIndex) {
        return;
      }
      
      var model = this.models[index];
      var changed = !(model && model === this.selectedModel);

      if (changed && this.selectedModel) {
        this.selectedModel.sound.stop();
      }

      if (model && model.sound) {
        this.selectedModel = model;
        this.selectedIndex = index;

        if (changed) {
          model.sound.play({
            multiShotEvents: true,
            onfinish: _.bind(function() {
              this.next({ wrapAround: true });
            }, this),
            whileplaying: _.bind(function () {
              model.set('position', model.sound.position);
            }, this)
          });
        }
      } else {
        this.selectedModel = null;
        this.selectedIndex = null;
      }

      if (!options.silent) {
        this.trigger("change:selected", model, index);
      }
    },

    /**
     * Selects item before the currently selected item. Selects last item
     * if nothing is selected.
     * @param {Object} [options={}] Options
     * @param {Boolean} [wrapAround=false] Select last item if first one is currently selected
     */
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
    
    /**
     * Selects item after the currently selected item. Selects first item
     * if nothing is selected.
     * @param {Object} [options={}] Options
     * @param {Boolean} [wrapAround=false] Select first item if last one is currently selected
     */
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
