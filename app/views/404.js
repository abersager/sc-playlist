define([
  'views/view',
  'tpl!templates/404.html'
],
function (View, template) {
  var View404 = View.extend({
    template: template
  });

  return View404;
});
