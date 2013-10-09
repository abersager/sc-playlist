define([
  'views/position'
],
function (PositionView) {
  describe("PositionView", function () {
    describe("padLeft", function () {

      var padLeft = PositionView.prototype.padLeft;

      it("pads numbers to a default length of 2 with zeros", function () {
        expect(padLeft(6)).toEqual('06');
      });

      it("pads numbers to a custom length with zeros", function () {
        expect(padLeft(6, 5)).toEqual('00006');
      });

      it("pads numbers to a custom length with custom padding character", function () {
        expect(padLeft(6, 5, ' ')).toEqual('    6');
      });

      it("does not shorten number when no padding is required", function () {
        expect(padLeft(600)).toEqual('600');
      });
    });
  });
});
