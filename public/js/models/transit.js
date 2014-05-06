define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) 
{
    Transit = Backbone.Model.extend(
    {
        url: '/api/v1/transit',

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
            throw new Error("ERROR: Transit information could not be fetched.");
        }
    });

    return Transit;
});