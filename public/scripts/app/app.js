define([
    'angular',
	'angularLocalStorage',
    'angularRoute',
    'tmh.dynamicLocale',
    'angular-translate',
    'useStaticFilesLoader',
    'AuthenticationServices',
    'UtilityServices',
    'LoginServices',
    'TokenInterceptorService',
    'AlertServices',
    'navBarCtrl',
    'loginCtrl',
    'signupCtrl',
    'homeCtrl',
    'welcomeCtrl'


], function (angular) {
    'use strict';

    var mainApp =  angular.module('mainApp', [
        'ngRoute',
		'LocalStorageModule',
        'tmh.dynamicLocale',
        'pascalprecht.translate',
        'AuthenticationServices',
        'UtilityServices',
        'LoginServices',
        'TokenInterceptorService',
        'AlertServices',
        'navBarCtrl',
        'loginCtrl',
        'signupCtrl',
        'homeCtrl',
        'welcomeCtrl'
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
            when('/welcome', {
                templateUrl: 'partials/welcome.html',
                controller: 'welcomeCtrl',
                access: { requiredLogin: false }
            }).
            otherwise({
                    redirectTo: '/welcome'
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
                    $location.path("/welcome");
                }else if (nextRoute.access.requiredLogin && !AuthenticationServices.isLoggedIn()) {
                    $location.path("/welcome");
                }

                var disableBackButton = false;
                if(nextRoute == undefined) {
                    var newUrl = '/welcome';
                } else {
                    var newUrl = nextRoute.$$route.originalPath;
                }
                if(currentRoute == undefined) {
                    var oldUrl = '/welcome';
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

