define([
    'angular',
	'angularLocalStorage',
    'angularRoute',
    'tmh.dynamicLocale',
    'angular-translate',
    'useStaticFilesLoader',
    'AuthenticationServices',
    'UtilityServices',
    'TokenInterceptorService',
    'AlertServices',
    'navBarCtrl',
    'loginCtrl',
    'signupCtrl'


], function (angular) {
    'use strict';

    var mainApp =  angular.module('mainApp', [
        'ngRoute',
		'LocalStorageModule',
        'tmh.dynamicLocale',
        'pascalprecht.translate',
        'AuthenticationServices',
        'UtilityServices',
        'TokenInterceptorService',
        'AlertServices',
        'navBarCtrl',
        'loginCtrl',
        'signupCtrl'
    ]);

    mainApp.config(['$httpProvider','$logProvider', 'tmhDynamicLocaleProvider','$translateProvider',
        function ($httpProvider, $logProvider, tmhDynamicLocaleProvider,$translateProvider) {

            $translateProvider.useStaticFilesLoader({
                files: [{
                    prefix: '/resources/language-',
                    suffix: '.json'
                }, {
                    prefix: '/resources/language-',
                    suffix: '.json'
                }, {
                    prefix: '/resources/language-',
                    suffix: '.json'
                }]
            });
            $translateProvider.preferredLanguage('en');
            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.useSanitizeValueStrategy('escapeParameters');
            $httpProvider.interceptors.push('TokenInterceptorService');
            $logProvider.debugEnabled(true);
    }]);


    mainApp.config(['$routeProvider','$compileProvider',
        function($routeProvider,$compileProvider) {
            console.log("Main app Config :: ", $routeProvider);
            $routeProvider.
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl',
                access: { requiredLogin: false }
            }).
            when('/signUp', {
                templateUrl: 'partials/signup.html',
                controller: 'signupCtrl',
                access: { requiredLogin: false }
            }).
            when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'homeCtrl',
                access: { requiredLogin: true }
            }).
            otherwise({
                    redirectTo: '/login'
            });
        }



    ]);

    mainApp.run(['$rootScope','$location','AuthenticationServices','localStorageService','UtilityServices','AlertServices',
        function($rootScope, $location, AuthenticationServices,localStorageService,UtilityServices,AlertServices) {
        console.log("Main App Started");
        $rootScope.app = {
                    name: 'SampleApp',
                    description: 'Powered by Garihc',
                    year: ((new Date()).getFullYear()),
                  };
            console.log("%c2. Application deployed successfully.\n"+"\t App Description: "+$rootScope.app.name+"\n \t"+$rootScope.app.description+"@"+$rootScope.app.year+"\n \t ==========================\n", "color: green; font-size:12px;");
            $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
                if (nextRoute.access===undefined) {
                    $location.path("/login");
                }else if (nextRoute.access.requiredLogin && !AuthenticationServices.isLoggedIn()) {
                    $location.path("/login");
                }

                var disableBackButton = false;
                if(nextRoute == undefined) {
                    var newUrl = '/login';
                } else {
                    var newUrl = nextRoute.$$route.originalPath;
                }
                if(currentRoute == undefined) {
                    var oldUrl = '/login';
                } else {
                    var oldUrl = currentRoute.$$route.originalPath;
                }
                if($rootScope.showAlert){
                    $rootScope.showAlert=false
                }
            });
        }]);





    return mainApp;
});

