define([
  'views/view',
  'tpl!templates/player.html',
  'soundcloud',
  'soundcloud-widget'
],
function (View, template, SoundCloud) {
  var PlayerView = View.extend({

    className: 'player',
    template: template,
    SoundCloud: SoundCloud,

    initialize: function () {
      _.bindAll(this, 'embed', 'onFinish');
      this.listenTo(this.collection, 'change:selected', this.render);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      if (this.collection.selectedModel) {
        var url = this.collection.selectedModel.get('permalink_url');
        this.SoundCloud.oEmbed(url, { auto_play: true }, this.embed);
      }
    },

    embed: function(oEmbed) {
      var el = this.$el.find('.widget');
      el.removeClass('idle');
      el.html(oEmbed.html);
      var iframe = this.$el.find('iframe');
      var widget = this.widget = this.SoundCloud.Widget(iframe[0]);
      widget.bind(this.SoundCloud.Widget.Events.FINISH, this.onFinish);
    },

    onFinish: function () {
      this.collection.next({ wrapAround: true });
    }

  });

  return PlayerView;
});
