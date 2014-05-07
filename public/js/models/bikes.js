define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) 
{
    Bikes = Backbone.Model.extend(
    {
        url: '/api/v1/citibike',

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
            throw new Error("ERROR: Citibike information could not be fetched.");
        }
    });

    return Bikes;
});