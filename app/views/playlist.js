define([
  'views/view',
  'views/track',
  'tpl!templates/playlist.html',
  'jquery-nestable'
],
function (View, TrackView, template) {
  var Playlist = View.extend({
    template: template,

    initialize: function () {
      this.listenTo(this.collection, 'add remove reset sort change:selected', this.render);
    },

    events: {
      'click a.previous': 'onPrevious',
      'click a.next': 'onNext',
      'click a.clear': 'onClear',
      'click .dd li': 'onClick',
      'change': 'onChangeOrder'
    },
    
    render: function () {
      View.prototype.render.apply(this, arguments);

      var ol = this.$el.find('ol').empty();
      this.tracks = this.collection.map(function (model, index) {
        var track = new TrackView({
          model: model,
          index: index
        });
        track.render();
        ol.append(track.$el);
        return track;
      });

      this.$el.find('.dd').nestable({
        maxDepth: 1
      });
    },

    onPrevious: function () {
      this.collection.previous({ wrapAround: true });
      return false;
    },

    onNext: function () {
      this.collection.next({ wrapAround: true });
      return false;
    },

    onClear: function () {
      this.collection.reset([]);
    },

    onClick: function (e) {
      e.preventDefault();
      e.stopPropagation();

      // find out which track was clicked
      var index = this.$el.find('li').index($(e.currentTarget));
      this.collection.select(index);
    },

    onChangeOrder: function () {
      var order = this.$el.find('li').map(function() {
        return parseFloat($(this).data('id')) - 1;
      }).get();

      var models = _.map(order, function (index) {
        return this.collection.at(index);
      }, this);

      this.collection.reset(models);
    }
  });

  return Playlist;
});
