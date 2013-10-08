define([
  'collections/playlist',
  'views/playlist'
],
function (Playlist, PlaylistView) {
  describe("PlaylistView", function () {
    describe("onChangeOrder", function () {

      var el;
      beforeEach(function() {
        el = $('<div id="jasmine-playground"></div').appendTo('body');
        spyOn(Playlist.prototype.model.prototype, "initialize");
      });

      afterEach(function() {
        el.remove();
      });

      it("resets the collection with the new order", function () {
        var collection = new Playlist([
          { stage: 'one' },
          { stage: 'two' },
          { stage: 'three' }
        ]);
        var models = _.clone(collection.models);

        var playlist = new PlaylistView({
          el: el,
          collection: collection
        });
        playlist.render();

        var lis = playlist.$el.find('.dd li');
        lis.eq(2).insertBefore(lis.eq(0));

        playlist.onChangeOrder();

        expect(collection.at(0)).toBe(models[2]);
        expect(collection.at(1)).toBe(models[0]);
        expect(collection.at(2)).toBe(models[1]);
      });
    });
  });
});
