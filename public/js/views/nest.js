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

            Nest.model = new Nest();

            Nest.model.bind('change', this.render);

            Nest.model.trigger('change');

            Nest.$pusher = new Pusher('772c12fd3cfe4cfd7ab3');
            Nest.$channel = Nest.$pusher.subscribe('solar');
            Nest.$channel.bind('Nest', function() 
            {
                console.log('PUSHER EVENT: NEST CHANGE TRIGGERED');
                Nest.model.trigger('change');
            });
        }, 

        render: function()
        {
            Nest.model.on('change', function()
            {
                var template = _.template(nestTemplate, { nest : Nest.model });

                $('#widget__nest').html(template);
            });
        }

    });


    return NestView;
});