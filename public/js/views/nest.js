define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/nest.html'

], function ($, _, Backbone, nestTemplate) 
{

    Nest = Backbone.Model.extend({
        url: '/api/v1/nest',

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

    NestView = Backbone.View.extend({

        el: $('#widget__nest'),

        initialize: function() 
        {
            _.bindAll(this, 'render');

            this.model = new Nest();

            this.model.bind('change', this.render);
        }, 

        render: function()
        {
            var template = _.template(nestTemplate, { nest : this.model });

            this.$el.html(template);

            that = this; 
        }

    });


    return NestView;
});