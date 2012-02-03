(function() {
  var Candle;

  Candle = (function() {

    function Candle(dom, average) {
      var i;
      this.dom = dom;
      this.average = average;
      this.oldBrightness = (function() {
        var _ref, _results;
        _results = [];
        for (i = 1, _ref = this.average; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
          _results.push(0.5);
        }
        return _results;
      }).call(this);
    }

    Candle.prototype.reduceValues = function() {
      var i, x, _i, _len, _ref;
      x = 0;
      _ref = this.oldBrightness;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        x += i;
      }
      return x / this.average;
    };

    Candle.prototype.update = function(newBrightness) {
      this.oldBrightness.push(newBrightness);
      this.oldBrightness.shift(1);
      return this.dom.css('opacity', this.reduceValues());
    };

    return Candle;

  })();

  $.fn.flicker = function(config) {
    var applyCssSmoothing, average, candles, cssSmooth, element, flickerRate, offset, randomLuminosity, rnd, spike, spikeFrequency, spread, start, _ref, _ref2, _ref3, _ref4, _ref5, _ref6,
      _this = this;
    flickerRate = (_ref = config != null ? config.flickerRate : void 0) != null ? _ref : 15;
    average = (_ref2 = config != null ? config.average : void 0) != null ? _ref2 : 2;
    spread = (_ref3 = config != null ? config.spread : void 0) != null ? _ref3 : 0.6;
    cssSmooth = (_ref4 = config != null ? config.cssSmooth : void 0) != null ? _ref4 : true;
    offset = (_ref5 = config != null ? config.offset : void 0) != null ? _ref5 : 0.5 - spread / 2;
    spikeFrequency = (_ref6 = config != null ? config.spikeFrequency : void 0) != null ? _ref6 : 0.05;
    rnd = Math.random;
    candles = (function() {
      var _i, _len, _ref7, _results;
      _ref7 = this.toArray();
      _results = [];
      for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
        element = _ref7[_i];
        _results.push(new Candle($(element), average));
      }
      return _results;
    }).call(this);
    randomLuminosity = function() {
      if (spike()) {
        return 1;
      } else {
        return ((rnd() * spread + offset) + (rnd() * spread + offset)) / 2;
      }
    };
    spike = function() {
      return rnd() < spikeFrequency;
    };
    applyCssSmoothing = function() {
      return _this.css({
        '-webkit-transition': "opacity linear " + (1 / flickerRate) + "s",
        '-moz-transition': "opacity linear " + (1 / flickerRate) + "s",
        '-ms-transition': "opacity linear " + (1 / flickerRate) + "s",
        '-o-transition': "opacity linear " + (1 / flickerRate) + "s",
        'transition': "opacity linear " + (1 / flickerRate) + "s"
      });
    };
    start = function() {
      var candle, _i, _len;
      for (_i = 0, _len = candles.length; _i < _len; _i++) {
        candle = candles[_i];
        candle.update(randomLuminosity());
      }
      return setTimeout(start, 1000 / flickerRate);
    };
    if (cssSmooth === true) applyCssSmoothing();
    start();
    return this;
  };

}).call(this);
