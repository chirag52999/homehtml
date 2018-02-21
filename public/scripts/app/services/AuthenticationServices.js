define(['angular'], function(angular) {
    'use strict';

    var AuthenticationServices = angular.module('AuthenticationServices', []);

    AuthenticationServices.service('AuthenticationServices', ['localStorageService','$window','$log',
        function(localStorageService,$window,$log) {
            $log.info("Authentication is in progress...");

            return{
                isLoggedIn: function() {
                    var authenticated = false;
                    if(localStorageService.get("auth_token")!==null || $window.sessionStorage.token != null)
                        authenticated = true;

                    return authenticated;
                }
            }
    }])
    return AuthenticationServices;
});
