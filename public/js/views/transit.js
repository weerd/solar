define([
    'jquery',
    'underscore',
    'backbone',
    'models/transit',
    'pusher',
    'live',
    'text!templates/transit.html'

], function ($, _, Backbone, Transit, Pusher, Backpusher, transitTemplate) 
{
    TransitView = Backbone.View.extend({

        el: $('#widget__transit'),

        initialize: function() 
        {
            _.bindAll(this, 'render');

            this.model = new Transit();

            this.model.bind('change', this.render);

            var pusher = new Pusher('772c12fd3cfe4cfd7ab3');
            var channel = pusher.subscribe('solar');

            that = this;

            channel.bind('transit', function(data) {
                that.model.trigger('change');
            });
        }, 

        render: function()
        {
            var template = _.template(transitTemplate, { transit : this.model });

            this.$el.html(template);
        }

    });


    return TransitView;
});