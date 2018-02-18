require.config({
    baseUrl: 'scripts/lib',
    paths :{
        'app' : '../app/app',
        'jquery' : 'jquery/dist/jquery.min',
        'angular' :'angular/angular.min',
        'angularRoute' : 'angular-route/angular-route.min',
		'angularLocalStorage' : 'angular-local-storage/dist/angular-local-storage.min',
        'bootstrap' : 'bootstrap/dist/js/bootstrap.min',
        'LoginCtrl':'../app/LoginCtrl',
        'LoginServices': '../app/services/LoginServices',
        'AlertServices': '../app/services/AlertServices',
        'UtilityServices':'../app/services/UtilityServices',
        'AuthenticationServices' : '../app/services/AuthenticationServices',
        'TokenInterceptorService' : '../app/services/TokenInterceptorService',
        'angular-translate' : 'angular-translate/dist/angular-translate.min',
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularRoute' :{
            deps: ['angular'],
            exports : 'angularRoute'
        },
		'angularLocalStorage' :{
            deps: ['angular'],
            exports : 'angularLocalStorage'
        }
    }
});



require(['require','jquery','angular','angularRoute','angularLocalStorage','app'], function () {
    angular.element(document).ready(function() {
        console.log("%c1. Bootstrapping Libraries Success..","color: grey; font-size:12px;");
        angular.bootstrap(document, ['mainApp']);
    });
});

