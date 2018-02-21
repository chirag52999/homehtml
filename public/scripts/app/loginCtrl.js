define(['angular'],function(angular){
    'use strict';
    var loginCtrl = angular.module('loginCtrl', []);
    loginCtrl.controller('loginCtrl', ['$scope','$location',
        function ($scope,$location) {

            console.log("i am in login ctrl ----");
            $scope.openLoginDiv=false;

            $scope.signUp=function()
            {
                $location.path("/signup")

            };
            $scope.loginInBy=function(){
                $location.path("/landingPage")
            }

        }


    ]);

});