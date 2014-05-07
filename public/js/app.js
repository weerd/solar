if(typeof window.console === undefined) {
    window.console = console = {log: function() {}, warn: function() {}};
}

define([
    'underscore',
    'jquery',
    'backbone',
    'views/weather',
    'views/nest',
    'views/transit',
    'views/bikes'

], function(_, $, Backbone, WeatherView, NestView, TransitView, BikeView) 
{

    var App = Backbone.View.extend({

        initialize: function() 
        {
            new WeatherView();
            new NestView();
            new TransitView();
            new BikeView();
        }

    });


    return App; 
});