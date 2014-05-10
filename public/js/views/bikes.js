define([
    'jquery',
    'underscore',
    'backbone',
    'pusher',
    'models/bikes',
    'text!templates/bikes.html'

], function ($, _, Backbone, Pusher, Bikes, bikeTemplate) 
{

    BikeView = Backbone.View.extend(
    {
        el: $('#widget__bikes'),

        initialize: function() 
        {
            // _.bindAll(this, 'render');

            Bikes.model = new Bikes();

            Bikes.model.bind("change", this.render);

            BikeView.$pusher = new Pusher('772c12fd3cfe4cfd7ab3');
            BikeView.$channel = BikeView.$pusher.subscribe('solar');
            BikeView.$channel.bind('bikes', function(data) 
            {
                console.log('PUSHER EVENT: BIKES CHANGE TRIGGERED');
                Bikes.model.trigger('change');
            });
        }, 

        render: function()
        {
            Bikes.model.on('change', function()
            {
                var template = _.template(bikeTemplate, { bikesData : Bikes.model });

                $('#widget__bikes').html(template);
            });
        }

    });

    return BikeView;
});