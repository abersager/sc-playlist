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
  });
});
