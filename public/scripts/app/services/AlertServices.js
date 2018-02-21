define(['angular'], function (angular) {
    'use strict';

    var AlertServices = angular.module('AlertServices', []);

    AlertServices.service('AlertServices',['$rootScope','$timeout', function($rootScope,$timeout){
        
        initService();
        
        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                    clearAlert();
                });
        }

            function clearAlert() {
                var alert = $rootScope.alert;
                if (alert) {
                    if (!alert.keepAfterLocationChange) {
                        delete $rootScope.alert;
                    } else {
                        // only keep for a single location change
                        alert.keepAfterLocationChange = false;
                    }
                }
            }
        
        return{
            
            Success: function(message, keepAfterLocationChange,ErCode){
                $rootScope.showAlert = true;
                $rootScope.alert = {
                    message: message,
                    ErCode:ErCode,
                    type: 'success',
                    keepAfterLocationChange: keepAfterLocationChange
                };
               $timeout(function(){$rootScope.showAlert = false;}, 2000);
            },
            Error: function(message, keepAfterLocationChange,ErCode){
                $rootScope.showAlert = true;
                $rootScope.alert = {
                    message: message,
                    ErCode:ErCode,
                    type: 'error',
                    keepAfterLocationChange: keepAfterLocationChange
                };
                //$timeout(function(){$rootScope.showAlert = false;}, 2000);
            }
            }
    }])
    return AlertServices;
});

