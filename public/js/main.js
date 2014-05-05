require.config({

});

require([
    'backbone',
    'app'
], function (Backbone, SLRApp ) {

    new SLRApp({
        el: $('body').find('#solar--wrapper')
    });
});