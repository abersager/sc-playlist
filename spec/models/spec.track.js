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
        stream = jasmine.createSpy(); 
        Track.prototype.SoundCloud.get = get;
        Track.prototype.SoundCloud.stream = stream;
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
        var callback1 = get.argsForCall[0][2];
        callback1(trackInfo);

        expect(stream.argsForCall[0][0]).toEqual('/tracks/123');

        var sound = { testsound: true };
        var callback2 = stream.argsForCall[0][1];
        callback2(sound);
        
        expect(track.sound).toBe(sound);
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

        var callback1 = get.argsForCall[0][2];
        callback1(trackInfo);

        expect(stream.argsForCall[0][0]).toEqual('/tracks/123');

        var sound = { testsound: true };
        var callback2 = stream.argsForCall[0][1];
        callback2(sound);
        
        expect(track.sound).toBe(sound);
        expect(track.get('permalink_url')).toEqual('test_permalink');
        expect(track.get('soundcloudId')).toEqual('123');
        expect(track.get('id')).not.toEqual('123');
        expect(track.get('foo')).toEqual('bar');
      });

      it("removes track from collection when SoundCloud errors", function () {
        var track = new Track({
          permalink_url: 'test_permalink'
        });
        track.collection = {
          remove: jasmine.createSpy()
        };

        expect(get.argsForCall[0][0]).toEqual('/resolve');
        expect(get.argsForCall[0][1]).toEqual({ url: 'test_permalink' });

        var trackInfo = {
          errors: [{
              error_message: "404 - Not Found"
          }]
        };

        var callback = get.argsForCall[0][2];
        callback(trackInfo);

        expect(track.collection.remove).toHaveBeenCalledWith(track);
      });
    });
  });
});
