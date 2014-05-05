define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/weather.html'

], function ($, _, Backbone, weatherTemplate) 
{

    Weather = Backbone.Model.extend({
        url: '/api/v1/weather',

        initialize: function(){
            this.fetch({
                success: this.fetchSuccess,
                error: this.fetchError
            });
        },

        parse: function(response) 
        {
            return response;
        },

        fetchSuccess: function (model, response) {
            console.log('FETCH SUCCESS: ', response);
            console.log('FETCH MODEL: ', model);
        },

        fetchError: function (model, response) {
            throw new Error("Books fetch error");
        }
    });

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
            var template = _.template(weatherTemplate, { weather : this.model });

            this.$el.html(template);

            that = this; 

            var tileSwap = setInterval(function()
            {
                that.$el.find('.widget--front').toggleClass('widget--swap');
                that.$el.find('.widget--back').toggleClass('widget--swap');
            }, 10000);
        }

    });


    return WeatherView;
});