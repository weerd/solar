define([
    'jquery',
    'underscore',
    'backbone',
    'models/nest',
    'text!templates/nest.html'

], function ($, _, Backbone, Nest, nestTemplate) 
{

    NestView = Backbone.View.extend(
    {
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