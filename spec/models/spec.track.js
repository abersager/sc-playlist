define([
  'models/track'
],
function (Track) {
  describe("Track", function () {
    describe("initialize", function () {

      var get;
      beforeEach(function() {
        spyOn(Track.prototype, "SoundCloud");
        get = jasmine.createSpy(); 
        Track.prototype.SoundCloud.get = get;
      });

      it("updates track details from uri on initialisation", function () {
        var track = new Track({
          uri: 'test_path',
          permalink_url: 'test_permalink'
        });

        expect(get.argsForCall[0][0]).toEqual('/resolve');
        expect(get.argsForCall[0][1]).toEqual({ url: 'test_path' });

        var trackInfo = {
          id: '123',
          foo: 'bar'
        };

        var callback = get.argsForCall[0][2];
        callback(trackInfo);

        expect(track.get('uri')).toEqual('test_path');
        expect(track.get('soundcloudId')).toEqual('123');
        expect(track.get('id')).not.toEqual('123');
        expect(track.get('foo')).toEqual('bar');
      });

      it("updates track details from permalink on initialisation", function () {
        var track = new Track({
          permalink_url: 'test_permalink'
        });

        expect(get.argsForCall[0][0]).toEqual('/resolve');
        expect(get.argsForCall[0][1]).toEqual({ url: 'test_permalink' });

        var trackInfo = {
          id: '123',
          foo: 'bar'
        };

        var callback = get.argsForCall[0][2];
        callback(trackInfo);

        expect(track.get('permalink_url')).toEqual('test_permalink');
        expect(track.get('soundcloudId')).toEqual('123');
        expect(track.get('id')).not.toEqual('123');
        expect(track.get('foo')).toEqual('bar');
      });
    });
  });
});
