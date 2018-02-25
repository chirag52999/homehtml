require.config({
    baseUrl: 'scripts/lib',
    paths :{
        'app' : '../app/app',
        'jquery' : 'jquery/dist/jquery.min',
        'angular' :'angular/angular.min',
        'angularRoute' : 'angular-route/angular-route.min',
		'angularLocalStorage' : 'angular-local-storage/dist/angular-local-storage.min',
        'tmh.dynamicLocale' : 'angular-dynamic-locale/dist/tmhDynamicLocale.min',
        'useStaticFilesLoader' : 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
        'angular-translate' : 'angular-translate/dist/angular-translate.min',
        'bootstrap' : 'bootstrap/dist/js/bootstrap.min',
        'LoginServices': '../app/services/LoginServices',
        'AlertServices': '../app/services/AlertServices',
        'UtilityServices':'../app/services/UtilityServices',
        'AuthenticationServices' : '../app/services/AuthenticationServices',
        'TokenInterceptorService' : '../app/services/TokenInterceptorService',
        'angular-translate' : 'angular-translate/dist/angular-translate.min',
        'AuthenticationServices' : '../app/services/AuthenticationServices',
        'TokenInterceptorService' : '../app/services/TokenInterceptorService',
        'AlertServices': '../app/services/AlertServices',
        'UtilityServices':'../app/services/UtilityServices',
        'loginCtrl':'../app/loginCtrl',
        'navBarCtrl':'../app/navBarCtrl',
        'signupCtrl':'../app/signupCtrl',
        'homeCtrl':'../app/homeCtrl'
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



require(['require','jquery','angular','angularRoute','angularLocalStorage', 'tmh.dynamicLocale','app'], function () {
    angular.element(document).ready(function() {
        console.log("%c1. Bootstrapping Libraries Success..","color: grey; font-size:12px;");
        angular.bootstrap(document, ['mainApp']);
    });
});

