define([
  'views/view'
],
function (View) {
  var PositionView = View.extend({

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.listenTo(this.model, 'change:position', this.render);
    },

    render: function () {
      var seconds = Math.floor(this.model.get('position') / 1000);
      var minutes = Math.floor(seconds / 60);
      this.$el.html(minutes + ":" + this.padLeft(seconds));
    },

    /**
     * Pads numbers to a minimum number of characters
     * e.g. padLeft(5, 3) => "005"
     * @param {String|Number} value Number to pad
     * @param {Number} [n=2] Number of characters to pad to
     * @param {String} [padChar='0'] Character to use for padding
     */
    padLeft: function (value, n, padChar) {
      value = value.toString();
      n = n || 2;
      var padding = Array(n + 1).join(padChar || '0');
      return (padding + value).slice(Math.max(value.length, n) * -1);
    }

  });

  return PositionView;
});
