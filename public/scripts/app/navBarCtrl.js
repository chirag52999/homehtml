define(['angular'],function(angular){
    'use strict';
    var navBarCtrl = angular.module('navBarCtrl', []);
    navBarCtrl.controller('navBarCtrl', ['$scope','$location','UtilityServices','localStorageService','$window',
        function ($scope,$location,UtilityServices,localStorageService,$window) {
            console.log("i am in navBarCtrl ctrl ----")
            $scope.navBarData={
                "username":""
            }
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
            $scope.isSignIn=function(){
                var user=localStorageService.get('user')
                if($location.path()!=="/signUp" && $location.path()!=="/login" && !UtilityServices.isVoid(user)){
                    $scope.navBarData.username=user.name;
                    return true;
                }
                else{
                    return false;
                }
            }
            $scope.signOutCall=function(){
                delete $window.sessionStorage.token;
                // delete token cookie
                // localStorageService.set('token',null)
                var lng = localStorageService.get("language");
                var appName=localStorageService.get("appName");
                var config=localStorageService.get("configurations")
                localStorageService.clearAll();
                localStorageService.set("appName",appName);
                localStorageService.set("language", lng);
                localStorageService.set("configurations", config);
                $location.path("/login");
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