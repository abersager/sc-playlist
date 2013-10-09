define([
  'views/view',
  'views/position',
  'tpl!templates/player.html'
],
function (View, PositionView, template) {
  var PlayerView = View.extend({

    className: 'player',
    template: template,

    initialize: function () {
      this.listenTo(this.collection, 'change:selected', this.render);
    },

    events: {
      'click a.previous': 'onPrevious',
      'click a.next': 'onNext',
      'click a.pause': function () {
        if (this.collection.selectedModel) {
          this.collection.selectedModel.sound.togglePause();
        } else {
          this.collection.select(0);
        }
      }
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      if (this.collection.selectedModel) {
        new PositionView({
          model: this.collection.selectedModel,
          el: this.$el.find('.position')
        })
      }
    },

    onPrevious: function () {
      this.collection.previous({ wrapAround: true });
      return false;
    },

    onNext: function () {
      this.collection.next({ wrapAround: true });
      return false;
    }

  });

  return PlayerView;
});
