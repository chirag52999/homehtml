define(['angular'],function(angular){
    'use strict';
    var loginCtrl = angular.module('loginCtrl', []);
    loginCtrl.controller('loginCtrl', ['$scope','$location',
        function ($scope,$location) {
            console.log("in login ctrl ----");

        }
    ]);
});