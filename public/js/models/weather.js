define([
    'jquery',
    'underscore',
    'backbone',

], function ($, _, Backbone) 
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


    return Weather;
});