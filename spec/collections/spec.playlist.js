define([
  'collections/playlist',
  'models/track'
],
function (Playlist, Track) {
  describe("Playlist", function () {

    describe("localStorage", function () {

      beforeEach(function() {
        spyOn(Track.prototype, "initialize");
      });

      it("persists all changes to local storage", function () {
        var playlist = new Playlist();
        playlist.localStorage._clear();

        playlist.reset([{ stage: 'one' }]);
        playlist = null;

        playlist = new Playlist();
        playlist.fetch();
        expect(playlist.at(0).get('stage')).toEqual('one');

        playlist.add([{ stage: 'two' }]);
        playlist = null;

        playlist = new Playlist();
        playlist.fetch();
        expect(playlist.at(0).get('stage')).toEqual('one');
        expect(playlist.at(1).get('stage')).toEqual('two');

        playlist.remove(playlist.at(0));
        playlist = null;

        playlist = new Playlist();
        playlist.fetch();
        expect(playlist.at(0).get('stage')).toEqual('two');

        playlist.reset([{ stage: 'three' }]);
        playlist = null;

        playlist = new Playlist();
        playlist.fetch();
        expect(playlist.at(0).get('stage')).toEqual('three');

        playlist.localStorage._clear();
      });
    });

    describe("select", function () {
      
      var collection, spy;
      beforeEach(function() {
        spy = jasmine.createSpy();
        collection = new Playlist([
          { a: 'one' },
          { a: 'two' },
          { a: 'three' }
        ]);
        collection.on('change:selected', spy);
      });
      
      it("selects an item in the collection and triggers an event by default", function () {
        collection.select(1);
        expect(collection.selectedModel).toBe(collection.at(1));
        expect(collection.selectedIndex).toEqual(1);
        expect(spy).toHaveBeenCalledWith(collection.at(1), 1);
      });
      
      it("selects an item in the collection but allows suppressing the event", function () {
        collection.select(1, { silent: true });
        expect(collection.selectedModel).toBe(collection.at(1));
        expect(collection.selectedIndex).toEqual(1);
        expect(spy).not.toHaveBeenCalled();
      });
      
      it("does not do anything when the item is already selected", function () {
        collection.select(1, { silent: true });
        expect(collection.selectedModel).toBe(collection.at(1));
        expect(collection.selectedIndex).toEqual(1);
        expect(spy).not.toHaveBeenCalled();
        collection.select(1);
        expect(spy).not.toHaveBeenCalled();
        collection.select(2);
        expect(spy).toHaveBeenCalled();
      });
      
      it("unselects the current selection", function () {
        collection.select(1, { silent: true });
        expect(collection.selectedModel).toBe(collection.at(1));
        expect(collection.selectedIndex).toEqual(1);
        collection.select(null);
        expect(spy.argsForCall[0][0]).toEqual(null);
        expect(spy.argsForCall[0][1]).toEqual(null);
      });
    });
  });
});
