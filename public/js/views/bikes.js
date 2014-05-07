define([
    'jquery',
    'underscore',
    'backbone',
    'models/bikes',
    'text!templates/bikes.html'

], function ($, _, Backbone, Bikes, bikeTemplate) 
{

    BikeView = Backbone.View.extend(
    {
        el: $('#widget__bikes'),

        initialize: function() 
        {
            _.bindAll(this, 'render');

            this.model = new Bikes();

            this.model.bind('change', this.render);
        }, 

        render: function()
        {
            var template = _.template(bikeTemplate, { bikes : this.model });

            this.$el.html(template);

            that = this; 
        }

    });


    return BikeView;
});