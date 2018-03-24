define(['angular'],function(angular){
    'use strict';
    var signupCtrl = angular.module('signupCtrl', []);
    signupCtrl.controller('signupCtrl', ['$scope','$location','UtilityServices','localStorageService','LoginServices','$timeout',
        function ($scope,$location,UtilityServices,localStorageService,LoginServices,$timeout) {
            console.log("in signup ctrl ----");
            $scope.signUpData={
                "companyType":"ADVERTISERS",
                "companyName":"",
                "userName":"",
                "email":"",
                "pass":"",
                "confirmPass":"",
                "interestIn":"",
                "loader":false
            }

            // signUp API Success Callback function
            $scope.signUpSuccess = function(data, status, headers, config){
                if(data.data.status === "success") {
                    $scope.signUpData.loader = false;
                    //GLOBAL SETTING --
                    swal("Congratulations !", "you have successfully signed up with advengelists. you can login now .Hooray!", "success",{button: {
                        text: "Login",
                    }}).then(function() {
                        $timeout(function () {
                            $location.path("/login");
                        }, 10);
                    });

                }
                else {
                    console.log("in signUp sucess with status fail")
                    $scope.signUpData.loader = false;
                    swal("OOPS !", "Whoops, looks like something went wrong", "error",{button: {
                        text: "Try Again",
                    }});
                }
            }
            $scope.signUpFail = function(data, status, headers, config){
                $scope.signUpData.loader = false;
                if (status === 401) {
                    swal("OOPS !", "Whoops, looks like something went wrong", "error",{button: {
                        text: "Try Again",
                    }});
                } else {
                    swal("OOPS !", "Whoops, looks like something went wrong", "error",{button: {
                        text: "Try Again",
                    }});
                }
            }
            function validateSignUp(){
                if(UtilityServices.isVoid($scope.signUpData.companyType)){
                    console.log("no companyType");
                    return false
                }
                else if(UtilityServices.isVoid($scope.signUpData.companyName)){
                    console.log("no companyName");
                    return false
                }
                else if(UtilityServices.isVoid($scope.signUpData.userName)){
                    console.log("no userName");
                    return false
                }
                else if(UtilityServices.isVoid($scope.signUpData.email)){
                    console.log("no email");
                    return false
                }
                else if(UtilityServices.isVoid($scope.signUpData.pass)){
                    console.log("nopass");
                    return false
                }
                else if(UtilityServices.isVoid($scope.signUpData.confirmPass)){
                    console.log("no confirmPass");
                    return false
                }
                else if($scope.signUpData.pass!==$scope.signUpData.confirmPass){
                    console.log("no pass match");
                    return false
                }
                else{
                    console.log("validated");
                    return true
                }
            }
            // signUp API
            $scope.doSignUp=function(){
                if(validateSignUp()){
                    $scope.signUpData.loader = true;
                    var config = localStorageService.get("configurations");
                    if(null == config || config === "") {
                        swal("OOPS !", "Whoops, looks like something went wrong", "error",{button: {
                            text: "Try Again",
                        }});
                        $scope.signUpData.loader = false;
                        return;
                    }
                    var user =
                        {
                            "companyType": $scope.signUpData.companyType,
                            "companyName":$scope.signUpData.companyName,
                            "userName": $scope.signUpData.userName,
                            "email":$scope.signUpData.email,
                            "pass": $scope.signUpData.pass,
                            "confirmPass":$scope.signUpData.confirmPass,
                            "interestIn":$scope.signUpData.interestIn
                        };
                    LoginServices.signUp(user,$scope.signUpSuccess,$scope.signUpFail);
                }
                else {
                    $scope.signUpData.loader = false;
                    console.log("not validated");
                    swal("OOPS !", "Please fill all required fields", "error",{button: {
                        text: "Try Again",
                    }});
               }
            }
        }
    ]);
});