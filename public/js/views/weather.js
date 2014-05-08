define([
    'jquery',
    'underscore',
    'backbone',
    'skycons',
    'moment',
    'models/weather',
    'text!templates/weather.html'

], function ($, _, Backbone, Skycons, moment, Weather, weatherTemplate) 
{
    WeatherView = Backbone.View.extend({

        el: $('#widget__weather'),

        initialize: function() 
        {
            _.bindAll(this, 'render');

            this.model = new Weather();

            this.model.bind('change', this.render);
        }, 

        render: function()
        {
            renderer = this;

            $.when(this.model.fetch()).done(function()
            {
                var template = _.template(weatherTemplate, { weather : renderer.model }),
                    skycon = new Skycons({"color": '#546169' }),
                    icon = renderer.model.get('currently').icon,
                    iconTwo = renderer.model.get('daily').data[1].icon,
                    iconThree = renderer.model.get('daily').data[2].icon,
                    iconFour = renderer.model.get('daily').data[3].icon;

                renderer.$el.html(template);

                skycon.add('weather-icon', ''+ icon +'');
                skycon.add('weather-forecast-1', ''+ iconTwo +'');
                skycon.add('weather-forecast-2', ''+ iconThree +'');
                skycon.add('weather-forecast-3', ''+ iconFour +'');

                skycon.play();

                var tileSwap = setInterval(function()
                {
                    renderer.$el.find('.widget--front').toggleClass('widget--swap');
                    renderer.$el.find('.widget--back').toggleClass('widget--swap');
                }, 10000);
            });

        }

    });
    
    return WeatherView;
});