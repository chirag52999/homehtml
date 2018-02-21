define(['angular'],function(angular){
    'use strict';
    var navBarCtrl = angular.module('navBarCtrl', []);
    navBarCtrl.controller('navBarCtrl', ['$scope','$location',
        function ($scope,$location) {

            console.log("i am in navBarCtrl ctrl ----")
            $scope.isNotSignIn=function(){
                console.log($location.path())
                if($location.path()==="/signup"){
                    return true;
                }
                else {
                    return false;
                }

            }
            $scope.signin=function(){
                $location.path("/login");
            }
            $scope.isLogin=function(){
                if($location.path()==="/landingPage" || $location.path()==="/evengelizedCampaigns" || $location.path()==="/moreBrands" ){
                    return true;
                }
                else {
                    return false;
                }
            }
            $scope.signout=function(){
                $location.path("/login");
            }

        }


    ]);

});