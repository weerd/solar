define([
    'jquery',
    'underscore',
    'backbone',
    'models/transit',
    'pusher',
    'text!templates/transit.html'

], function ($, _, Backbone, Transit, Pusher, transitTemplate) 
{
    TransitView = Backbone.View.extend({

        el: $('#widget__transit'),

        initialize: function() 
        {
            // _.bindAll(this, 'render');

            Transit.model = new Transit();

            Transit.model.bind('change', this.render);

            Transit.$pusher = new Pusher('772c12fd3cfe4cfd7ab3');
            Transit.$channel = Transit.$pusher.subscribe('solar');
            Transit.$channel.bind('transit', function() 
            {
                Transit.model.trigger('change');
            });
        }, 

        render: function()
        {
            $.when(Transit.model.change).done(function()
            {
                var template = _.template(transitTemplate, { transit : Transit.model });

                $('#widget__transit').html(template);
            });
        }

    });


    return TransitView;
});