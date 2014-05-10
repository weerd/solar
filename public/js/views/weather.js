define([
    'jquery',
    'underscore',
    'backbone',
    'pusher',
    'skycons',
    'moment',
    'models/weather',
    'text!templates/weather.html'

], function ($, _, Backbone, Pusher, Skycons, moment, Weather, weatherTemplate) 
{
    WeatherView = Backbone.View.extend({

        el: $('#widget__weather'),

        initialize: function() 
        {
            // _.bindAll(this, 'render');

            Weather.model = new Weather();

            Weather.model.bind("change", this.render);

            Weather.$pusher = new Pusher('772c12fd3cfe4cfd7ab3');
            Weather.$channel = Weather.$pusher.subscribe('solar');
            Weather.$channel.bind('weather', function() 
            {
                console.log('PUSHER EVENT: WEATHER CHANGE TRIGGERED');
                Weather.model.trigger('change');
            });
        }, 

        render: function()
        {
            $.when(Weather.model.change).done(function()
            {
                var template = _.template(weatherTemplate, { weather : Weather.model }),
                    skycon = new Skycons({"color": '#546169' }),
                    icon = Weather.model.get('currently').icon,
                    iconTwo = Weather.model.get('daily').data[1].icon,
                    iconThree = Weather.model.get('daily').data[2].icon,
                    iconFour = Weather.model.get('daily').data[3].icon;


                $('#widget__weather').html(template);

                skycon.add('weather-icon', ''+ icon +'');
                skycon.add('weather-forecast-1', ''+ iconTwo +'');
                skycon.add('weather-forecast-2', ''+ iconThree +'');
                skycon.add('weather-forecast-3', ''+ iconFour +'');

                skycon.play();

                // clearInterval(tileSwap);

                // var tileSwap = setInterval(function()
                // {
                //     $('#widget__weather').find('.widget--front').toggleClass('widget--swap');
                //     $('#widget__weather').find('.widget--back').toggleClass('widget--swap');
                // }, 10000);
            });

        }

    });
    
    return WeatherView;
});