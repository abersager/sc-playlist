define([
  'views/view',
  'tpl!templates/add.html'
],
function (View, template) {
  var AddView = View.extend({
    template: template,

    initialize: function (attrs, options) {
      View.prototype.initialize.apply(this, arguments);

      this.listenTo(this.model, 'change', this.render);
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
