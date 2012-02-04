Flickerer
=========

Flickerer can flicker your DOM elements as though they were light cast from a flame. True story.

Demo included, preview [here](http://lakmeer.github.com/jquery-flickerer/demo.html).


Hmmm
----

Why you would actually want this in a general case, I dunno, but I've used it to simulate lighting
in interactive scenes.

It is a generalisation of the code used in Exocomics #200, with config options, phrased as a jQuery plugin.
Requires CSS transitions for best results but not required for functionality. It is written in Coffeescript
but compiled JS is supplied here too.


Support
-------

Supports everything that jQuery supports, except looks inferior in IE due to lack of CSS transitions. You
could probably shim this with $.animate if you really really need it to be smooth in IE, or if you're sick.


Configuration
-------------

Configuration is made by config object. Here are the available properties with thier default values:


#### flickerRate (15)

Flickers (luminance keyframes) per second


#### average (2)

Luminance values are normalised by taking a running average over the previous _x_ values. Add more for more
conservative fluctuations


#### spread (0.6)

Spread of luminance values across median
Eg: spread of 0.6 gives `0.2 <= l <= 0.8`


#### offset (0.5 - spread / 2)

Bump up the minimum luminance, defaults to even spread across median.
Eg: offset of 0.5 with spread of 0.5 gives `0.5 <= l <= 1.0`


#### cssSmooth (true)

Enable CSS transitions to smooth the effect. Helps a lot with more laid back settings. Does nothing if CSS
transitions aren't available for your browser.


#### spikeFrequency (0.05)

Probability that the luminance will hit max once in a while. Goes right to 1 even if spread setting limits
normal output. This creates a candle-like 'sputtering' effect.


Future
------

There's a couple of interesting ways this could evolve, including:

- Memoizing some number of keyframes to increase performance
- Abstracting the luminance algorithm into a $.animate compatible easing function
- More realistic sputtering
- Probably more stuff
