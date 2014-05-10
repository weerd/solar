define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) 
{
    Weather = Backbone.Model.extend(
    {
        url: '/api/v1/weather',

        initialize: function()
        {
            this.fetch(
            {
                error: this.fetchError
            });
        },

        parse: function(response) 
        {
            return response;
        },

        fetchError: function (model, response) 
        {
            throw new Error("ERROR: Weather information could not be fetched.");
        }
    });

    return Weather;
});