define([
  'views/view',
  'tpl!templates/track.html'
],
function (View, template) {
  var TrackView = View.extend({
    tagName: 'li',
    className: 'dd-item',
    template: template,

    initialize: function (attrs, options) {
      View.prototype.initialize.apply(this, arguments);
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      if (this.model === this.model.collection.selectedModel) {
        this.$el.addClass('selected');
      }
      this.$el.attr('data-id', this.index + 1);
    },

    events: {
      'click a.remove': 'onRemove'
    },

    onRemove: function (e) {
      this.model.collection.remove(this.model);
      return false;
    }
  });

  return TrackView;
});
