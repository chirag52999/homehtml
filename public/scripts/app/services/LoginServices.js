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
                $http({method: 'POST', url: 'api/forgotPassword', data: {'userName': request.name, "portalName": request.appId}
                                    ,headers: {'Content-Type': 'application/json'}})
                .then(forgotPasswordSuccess,forgotPasswordFailure);
            }
        }
    }])
    return LoginServices;
});

