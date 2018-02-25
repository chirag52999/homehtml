define(['angular'],function(angular){
    'use strict';
    var homeCtrl = angular.module('homeCtrl', []);
    homeCtrl.controller('homeCtrl', ['$scope','$location',
        function ($scope,$location) {
            console.log("in home ctrl ----");

        }
    ]);
});