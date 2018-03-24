define(['angular'], function (angular) {
    'use strict';

    var LoginServices = angular.module('LoginServices', []);

    LoginServices.service('LoginServices',['$http', '$location', function($http,$location){
        return {
			
			loginApi : function(user,loginSuccess,loginFail){
				$http({method: 'POST', url: '/api/loginApi', data: user})
				.then(loginSuccess,loginFail);
			},
            forgotPassword : function(request,forgotPasswordSuccess,forgotPasswordFailure){
                $http({method: 'POST', url: '/api/forgotPassword', data: {'userName': request.name, "portalName": request.appId}
                                    ,headers: {'Content-Type': 'application/json'}})
                .then(forgotPasswordSuccess,forgotPasswordFailure);
            },
            signUp : function(request,signUpSuccess,signUpFailure){
                $http({method: 'POST', url: '/api/signUpApi',
                    data: {
                        "companyType": request.companyType,
                        "companyName":request.companyName,
                        "userName": request.userName,
                        "email":request.email,
                        "pass": request.pass,
                        "confirmPass":request.confirmPass,
                        "interestIn":request.interestIn
                    }
                    ,headers: {'Content-Type': 'application/json'}})
                .then(signUpSuccess,signUpFailure);
            }
        }
    }])
    return LoginServices;
});

