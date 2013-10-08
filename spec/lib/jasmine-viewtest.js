jasmine.viewTest = {
  /**
   * Renders a view into a DOM element and runs assertions against it
   * Locale calls simply return the key value
   * @param {Object} view View under test
   * @param {Function} assertions Method containing assertions
   * @param {Object} options Rendering options
   * @param {Boolean} [options.async=false] Assertions contain asynchronous code. Need to explicitly call setDone() parameter.
   * @param {Boolean} [options.standalone=true] Do not render subviews
   * @param {Object} [options.environment=undefined] jQuery object to inject into playground
   * @param {String} [options.environmentSelector=undefined] jQuery selector, where to inject view into. Needs to target element defined in options.environment
   */
  testView: function (view, assertions, options) {
    if(!view) {
      throw new Error('jasmine.viewTest.testView expects a view, instead got ' + typeof view);
    }
    
    options = options || {};
    options.standalone = typeof options.standalone === 'undefined' ? true : options.standalone;
    
    // set up DOM element to inject view into
    var playground = $('<div id="jasmine-playground"></div>');
    playground.appendTo('body');
    
    if (options.environment) {
      playground.append(options.environment);
    }
    
    var viewContainer;
    if (options.environmentSelector) {
      viewContainer = playground.find(options.environmentSelector);
    }
    else {
      viewContainer = playground;
    }
    view.playground = viewContainer;
    
    
    try {
      view.$el.appendTo(viewContainer);
      
      view.render({standalone: options.standalone});
      
      // execute assertions
      if (options.async) {
        var done = false;
        var setDone = function () { done = true; };
        var isDone = function () { return done; };

        assertions.call(view, setDone);
        waitsFor(isDone);
      }
      else {
        assertions.call(view);
      }
    } finally {
      // tear down
      playground.remove();
    }
  },
  /**
   * Renders a view and its subviews into a DOM element and runs assertions against them
   * @param {Object} view View under test
   * @param {Function} assertions Method containing assertions
   * @param {Boolean} [async=false] Assertions contain asynchronous code. Need to explicitly call setDone() parameter.
   */
  testViewWithSubviews: function (view, assertions, options) {
    options = options || {};
    options.standalone = false;
    this.testView(view, assertions, options)
  }
};
