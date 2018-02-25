define(['angular'],function(angular){
    'use strict';
    var navBarCtrl = angular.module('navBarCtrl', []);
    navBarCtrl.controller('navBarCtrl', ['$scope','$location',
        function ($scope,$location) {

            console.log("i am in navBarCtrl ctrl ----")
            $scope.isNotSignIn=function(){
                console.log($location.path())
                if($location.path()==="/signUp"){
                    return true;
                }
                else {
                    return false;
                }

            }
            $scope.notUser=function(){
                if($location.path()==="/login"){
                    return true;
                }
                else {
                    return false;
                }
            }
            $scope.signUp=function(){
                $location.path("/signUp");
            }
            $scope.signIn=function(){
                $location.path("/login");
            }
            $scope.signout=function(){
                $location.path("/login");
            }

        }


    ]);

});