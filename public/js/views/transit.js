define([
    'jquery',
    'underscore',
    'backbone',
    'models/transit',
    'text!templates/transit.html'

], function ($, _, Backbone, Transit, transitTemplate) 
{
    TransitView = Backbone.View.extend({

        el: $('#widget__transit'),

        initialize: function() 
        {
            _.bindAll(this, 'render');

            this.model = new Transit();

            this.model.bind('change', this.render);
        }, 

        render: function()
        {
            var template = _.template(transitTemplate, { transit : this.model });

            this.$el.html(template);
        }

    });


    return TransitView;
});