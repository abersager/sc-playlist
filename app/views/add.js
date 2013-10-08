define([
  'views/view',
  'tpl!templates/add.html'
],
function (View, template) {
  var AddView = View.extend({
    template: template,

    initialize: function (attrs, options) {
      View.prototype.initialize.apply(this, arguments);

      if (this.model) {
        this.listenTo(this.model, 'change', this.render);
      }
    },

    serialize: function () {
      var href = [
        "javascript:document.location = '",
        window.location.protocol,
        "//",
        window.location.host,
        "/add/' + encodeURI(document.location);"
      ].join('');

      return {
        href: encodeURI(href)
      }
    },

    events: {
      'click a.back': function () {
        window.history.back();
        return false;
      }
    }
  });

  return AddView;
});
