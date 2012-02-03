class Candle

    constructor : (@dom, @average) -> @oldBrightness = (0.5 for i in [1..@average])

    reduceValues : -> x = 0; (x += i for i in @oldBrightness); x / @average

    update : (newBrightness) ->
        @oldBrightness.push newBrightness
        @oldBrightness.shift 1
        @dom.css 'opacity', @reduceValues()




$.fn.flicker = (config) ->

    # Extend default options
    flickerRate    = config?.flickerRate    ? 15
    average        = config?.average        ? 2
    spread         = config?.spread         ? 0.6
    cssSmooth      = config?.cssSmooth      ? true
    offset         = config?.offset         ? 0.5 - spread / 2
    spikeFrequency = config?.spikeFrequency ? 0.05

    # Cache random function
    rnd = Math.random

    # Create candles
    candles = ( new Candle $(element), average for element in @toArray() )

    # Generate luminance value
    randomLuminosity = ->

        # Occasionally spike the luminance for candle sputter feel
        if spike() then 1 else

            # Average 2 random values for better dustribution clumping
            ((rnd() * spread + offset) + (rnd() * spread + offset)) / 2


    # Luminance spike checker
    spike = -> rnd() < spikeFrequency

    # Apply CSS transition if enabled
    applyCssSmoothing = =>
        @css
            '-webkit-transition' : "opacity linear #{ 1/flickerRate }s"
            '-moz-transition'    : "opacity linear #{ 1/flickerRate }s"
            '-ms-transition'     : "opacity linear #{ 1/flickerRate }s"
            '-o-transition'      : "opacity linear #{ 1/flickerRate }s"
            'transition'         : "opacity linear #{ 1/flickerRate }s"

    # Run timeline
    start = ->
        candle.update(randomLuminosity()) for candle in candles
        setTimeout start, 1000 / flickerRate

    # Init
    applyCssSmoothing() if cssSmooth is on
    start()

    # jQuery chaining
    return @





