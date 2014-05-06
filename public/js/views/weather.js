define([
    'jquery',
    'underscore',
    'backbone',
    'skycons',
    'models/weather',
    'text!templates/weather.html'

], function ($, _, Backbone, Skycons, Weather, weatherTemplate) 
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
            var template = _.template(weatherTemplate, { weather : this.model }),
                skycon = new Skycons({"color": '#546169' }),
                icon = this.model.get('currently').icon;

            this.$el.html(template);

            that = this; 

            skycon.set('weather-icon', ''+ icon + '');
            skycon.play();

            console.log(Skycons);

            var tileSwap = setInterval(function()
            {
                that.$el.find('.widget--front').toggleClass('widget--swap');
                that.$el.find('.widget--back').toggleClass('widget--swap');
            }, 10000);
        }

    });


    return WeatherView;
});