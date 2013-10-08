define([
  'backbone'
], function(Backbone) {

  var View = Backbone.View.extend({

    initialize: function (options) {
      _.extend(this, options);
    },
    
    /**
     * Renders a template with a context and injects result into view's DOM element
     * @param {Object} options Rendering options
     * @param {Boolean} [options.standalone=false] Do not render subviews
     */
    render: function(options) {
      options = _.extend({}, this.options, options);

      if (this.template) {
        var content = this.template(this.getContext());
        this.$el.html(content);
      }
    },
    
    /**
     * Creates template context object from this.serialize.
     */
    getContext: function(serialize) {
      serialize = serialize || this.serialize;

      // create the template context object
      var context;
      if (_.isFunction(serialize)) {
        context = serialize.call(this);
      } else if (_.isObject(serialize)) {
        context = serialize;
      } else {
        context = {};
      }
      return _.extend(this.getDefaultContext(), context);
    },

    getDefaultContext: function () {
      return {
        model: this.model,
        collection: this.collection
      };
    }

  });

  return View;
});