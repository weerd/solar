if(typeof window.console === undefined) {
    window.console = console = {log: function() {}, warn: function() {}};
}

define([
    'underscore',
    'jquery',
    'backbone',
    'views/weather',
    'views/nest',
    'views/transit'

], function(_, $, Backbone, WeatherView, NestView) 
{

    var App = Backbone.View.extend({

        initialize: function() 
        {
            new WeatherView();
            new NestView();
            new TransitView();
        }

    });


    return App; 
});