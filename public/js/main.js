require.config({
    shim: {
        'skycons': {
            exports: 'Skycons'
        },
        'pusher': {
            exports: 'Pusher'
        }
    },
    paths: {
        "moment": "moment",
    }
});

require([
    'backbone',
    'app'
], function (Backbone, SLRApp ) {

    new SLRApp({
        el: $('body').find('#solar--wrapper')
    });
});