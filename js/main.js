require.config({
    paths: {
        underscore: 'lib/underscore.min',
        angular: 'lib/angular.min',
        angularRoute: 'lib/angular-route.min',
        angularSanitize: 'lib/angular-sanitize.min'
    },

    shim: {
        underscore: {
            exports: 'underscore'
        },
        angular: {
            exports: 'angular'
        },
        angularRoute: {
            deps:['angular']
        },

        angularSanitize: {
            deps:['angular']
        }
    },

    deps: ['./init']
});