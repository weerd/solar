if(typeof window.console === undefined) {
    window.console = console = {log: function() {}, warn: function() {}}
}

define([
    'underscore',
    'jquery',
    'backbone',
    'views/weather',
    'views/nest'

], function(_, $, Backbone, WeatherView, NestView) 
{

    var App = Backbone.View.extend({

        initialize: function() 
        {
            new WeatherView();
            new NestView();
        }

    });


    return App;
})