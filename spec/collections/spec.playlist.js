define([
  'collections/playlist',
  'models/track'
],
function (Playlist, Track) {
  describe("Playlist", function () {

    beforeEach(function() {
      spyOn(Track.prototype, "initialize");
    });

    afterEach(function() {
      var playlist = new Playlist();
      playlist.localStorage._clear();
    });

    describe("localStorage", function () {

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
      });
    });

    describe("reset", function () {
      var playlist;
      beforeEach(function() {
        playlist = new Playlist([
          { stage: 'one' },
          { stage: 'two' },
          { stage: 'three' }
        ]);
      });

      it("preserves the currently selected model if possible", function () {
        var models = _.clone(playlist.models);

        playlist.select(1);
        expect(playlist.selectedModel).toBe(models[1]);
        expect(playlist.selectedIndex).toEqual(1);

        playlist.reset([models[1], models[2]]);
        expect(playlist.selectedModel).toBe(models[1]);
        expect(playlist.selectedIndex).toEqual(0);
      });

      it("unselects if the previously selected model is not in the collection anymore", function () {
        var models = _.clone(playlist.models);

        playlist.select(1);
        expect(playlist.selectedModel).toBe(models[1]);
        expect(playlist.selectedIndex).toEqual(1);

        playlist.reset([models[0], models[2]]);
        expect(playlist.selectedModel).toEqual(null);
        expect(playlist.selectedIndex).toEqual(null);
      });
    });

    describe("remove", function () {
      var playlist;
      beforeEach(function() {
        playlist = new Playlist([
          { stage: 'one' },
          { stage: 'two' },
          { stage: 'three' }
        ]);
      });

      it("preserves the currently selected model if possible", function () {
        var models = _.clone(playlist.models);

        playlist.select(1);
        expect(playlist.selectedModel).toBe(models[1]);
        expect(playlist.selectedIndex).toEqual(1);

        playlist.remove(models[0]);
        expect(playlist.selectedModel).toBe(models[1]);
        expect(playlist.selectedIndex).toEqual(0);
      });

      it("unselects if the previously selected model is not in the collection anymore", function () {
        var models = _.clone(playlist.models);

        playlist.select(1);
        expect(playlist.selectedModel).toBe(models[1]);
        expect(playlist.selectedIndex).toEqual(1);

        playlist.remove(models[1]);
        expect(playlist.selectedModel).toEqual(null);
        expect(playlist.selectedIndex).toEqual(null);
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

    describe("previous / next", function () {

      var playlist;
      beforeEach(function() {
        playlist = new Playlist([
          { stage: 'one' },
          { stage: 'two' },
          { stage: 'three' }
        ]);
      });

      describe("previous", function () {
        it("selects previous item", function () {
          playlist.select(2);
          playlist.previous();
          expect(playlist.selectedModel).toBe(playlist.at(1));
          playlist.previous();
          expect(playlist.selectedModel).toBe(playlist.at(0));
        });

        it("does not wrap around by default", function () {
          playlist.select(0);
          playlist.previous();
          expect(playlist.selectedModel).toBe(playlist.at(0));
        });

        it("can wrap around", function () {
          playlist.select(0);
          playlist.previous({ wrapAround: true });
          expect(playlist.selectedModel).toBe(playlist.at(2));
        });

        it("selects last item if nothing was selected", function () {
          playlist.previous();
          expect(playlist.selectedModel).toBe(playlist.at(2));
        });
      });

      describe("next", function () {
        it("selects next item", function () {
          playlist.select(0);
          playlist.next();
          expect(playlist.selectedModel).toBe(playlist.at(1));
          playlist.next();
          expect(playlist.selectedModel).toBe(playlist.at(2));
        });

        it("does not wrap around by default", function () {
          playlist.select(2);
          playlist.next();
          expect(playlist.selectedModel).toBe(playlist.at(2));
        });

        it("can wrap around", function () {
          playlist.select(2);
          playlist.next({ wrapAround: true });
          expect(playlist.selectedModel).toBe(playlist.at(0));
        });

        it("selects first item if nothing was selected", function () {
          playlist.next();
          expect(playlist.selectedModel).toBe(playlist.at(0));
        });
      });
    });
  });
});
