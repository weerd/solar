define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) 
{
    Nest = Backbone.Model.extend(
    {
        url: '/api/v1/nest',

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
            throw new Error("ERROR: NEST information could not be fetched.");
        }
    });

    return Nest;
});