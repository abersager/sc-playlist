define([
  'views/view'
],
function (View) {
  describe("View", function() {
    it("inherits from the Backbone View", function() {
      var instance = new View();
      expect(instance instanceof Backbone.View).toBeTruthy();
    });
    
    describe(".render", function() {
      
      var view;
      beforeEach(function() {
        view = new View();
      });
      
      it("renders the template with the current content into its DOM element", function() {
        spyOn(view, 'getContext').andReturn({
          foo: 'bar'
        });
        view.template = jasmine.createSpy().andReturn('rendered content');
        view.$el = {
          html: jasmine.createSpy()
        }
        
        view.render();
        
        expect(view.template).toHaveBeenCalledWith({foo: 'bar'});
        expect(view.$el.html).toHaveBeenCalledWith('rendered content');
      });
      
    });

    describe(".getContext", function() {
      
      var view;
      
      beforeEach(function() {
        view = new View();
      });
      
      it("provides a static serialize object in the template context", function() {
        var inner = jasmine.createSpy().andReturn("render result");
        var manage = jasmine.createSpy().andReturn({ render: inner });
        
        view.serialize = {
          foo: 'bar'
        };

        var result = view.getContext();
        
        expect(result.foo).toEqual("bar");
      });
      
      it("provides the result of a serialize function in the template context", function() {
        var inner = jasmine.createSpy().andReturn("render result");
        var manage = jasmine.createSpy().andReturn({ render: inner });
        
        view.serialize = function () {
          return { foo: 'bar' }
        };
        
        var result = view.getContext();
        
        expect(result.foo).toEqual("bar");
      });
      
      it("allows overriding the view's serialize property", function() {
        var inner = jasmine.createSpy().andReturn("render result");
        var manage = jasmine.createSpy().andReturn({ render: inner });
        
        view.serialize = {
          foo: 'bar'
        };

        var result = view.getContext({foo: 'baz'});
        
        expect(result.foo).toEqual("baz");
      });
      
    });

  });
});
