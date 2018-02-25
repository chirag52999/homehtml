define(['angular'],function(angular){
    'use strict';
    var loginCtrl = angular.module('loginCtrl', []);
    loginCtrl.controller('loginCtrl', ['$scope','$location','UtilityServices','LoginServices','localStorageService',
        function ($scope,$location,UtilityServices,LoginServices,localStorageService) {
            console.log("in login ctrl ----");
            $scope.loginData={
                "username":"",
                "password":"",
                "email":"",
                "loader":false,
                "forgetView":false
            }
            // Login API Success Callback function
            $scope.loginSuccess = function(data, status, headers, config){
                if(data.data.status === "success") {
                    $scope.loginData.loader = false;
                    //GLOBAL SETTING --
                    localStorageService.set('user',data.data.userInfo);
                    localStorageService.set('clientlist',data.data.clientlist);
                    $location.path("/home");
                }
                else {
                    console.log("in login sucess with status fail")
                    $scope.loginData.loader = false;
                    swal("OOPS !", "Wrong Username or Password", "error",{button: {
                        text: "Try Again",
                    }});
                }
            }
            $scope.loginFail = function(data, status, headers, config){
                $scope.loginData.loader = false;
                $log.info("In login Fail: Server messages");
                if (status === 401) {
                    $log.debug(data.data.message);
                    swal("OOPS !", "Wrong Username or Password", "error",{button: {
                        text: "Try Again",
                    }});
                } else {
                    $log.debug(data.data.message);
                    swal("OOPS !", "Whoops, looks like something went wrong", "error",{button: {
                        text: "Try Again",
                    }});
                }
            }
            // Login API
            $scope.doLogin=function(){
                if(!UtilityServices.isVoid($scope.loginData.username) && !UtilityServices.isVoid($scope.loginData.password)){
                    $scope.loginData.loader = true;
                    var config = localStorageService.get("configurations");
                    if(null == config || config === "") {
                        swal("OOPS !", "Whoops, looks like something went wrong", "error",{button: {
                            text: "Try Again",
                        }});
                        $scope.loginData.loader = false;
                        return;
                    }
                    var user = {"userName": $scope.loginData.username, "password":$scope.loginData.password,generateToken: 'true',
                        "portalName":config.appId};
                    LoginServices.loginApi(user,$scope.loginSuccess,$scope.loginFail);
                }
                else {
                    $scope.loginData.loader = false;
                    console.log("no username/password ");
                    swal("OOPS !", "Enter Username and Password", "error",{button: {
                        text: "Okay",
                    }});
                }
            }
            $scope.forgotPasswordSuccess = function(data, status, header, config){
                if (data.data.status != undefined && data.data.status === "success") {
                    console.log("sucess msg is like -",data.data.url);
                    $scope.loginData.loader = false;
                    swal("Congratulations !", "your password has been send to your email successfully", "success",{button: {
                        text: "Login",
                    }});
                    $scope.loginData.forgetView=false
                }
                else {
                    $scope.loginData.loader = false;
                    swal("OOPS !", "User does't exist", "error",{button: {
                        text: "Try Again",
                    }});
                    return;
                }
            }
            $scope.forgotPasswordFailure = function(data, status, header, config){
                $log.info("in reset password failure");
                $scope.loginData.loader = false;
                swal("OOPS !", "Whoops, looks like something went wrong", "error",{button: {
                    text: "Try Again",
                }});
                return;
            }
            $scope.forgetPass=function(){
                if(!UtilityServices.isVoid($scope.loginData.email)){
                    $scope.loginData.loader = true;
                    var config = localStorageService.get("configurations");
                    if(null == config || config === "") {
                        swal("OOPS !", "Whoops, looks like something went wrong", "error",{button: {
                            text: "Try Again",
                        }});
                        $scope.loginData.loader = false;
                        return;
                    }
                    LoginServices.forgotPassword({name:$scope.loginData.email, appId:config.appId},
                        $scope.forgotPasswordSuccess,$scope.forgotPasswordFailure);
                }
                else {
                    $scope.loginData.loader = false;
                    console.log("no username/password ");
                    swal("OOPS !", "Enter Email to Recover Password", "error",{button: {
                        text: "Okay",
                    }});
                }
            }
        }
    ]);
});