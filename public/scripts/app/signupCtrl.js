define(['angular'],function(angular){
    'use strict';
    var signupCtrl = angular.module('signupCtrl', []);
    signupCtrl.controller('signupCtrl', ['$scope','$location',
        function ($scope,$location) {
            console.log("in signup ctrl ----");

        }
    ]);
});