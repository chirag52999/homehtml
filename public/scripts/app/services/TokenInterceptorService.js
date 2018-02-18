define(['angular'], function(angular) {
    'use strict';

    var TokenInterceptorService = angular.module('TokenInterceptorService',[]);

    TokenInterceptorService.service('TokenInterceptorService',['$q','$location','localStorageService', '$window', '$log','$injector','AlertServices',
    function($q,$location,localStorageService,$window,$log,$injector,AlertServices) {
        //$log.info("at TokenInterceptorServie");

        return {
            request: function (config) {
                config.headers = config.headers || {};
                config.headers.AppName = localStorageService.get('appName');
                config.headers.language = localStorageService.get('language');
                if(localStorageService.get("auth_token") && config.url !== "/api/refresh")
                {
                    config.headers.Authorization = 'Bearer ' +localStorageService.get("auth_token");
                }else {
                    $log.info("Could not set token to header");
                }
                config.headers.ecodeshash = localStorageService.get('ecodeshash');
                config.headers.configFile = localStorageService.get('configFile');
                // config.headers.fbAppIdObj = localStorageService.get('fbAppIdObj');
                return config;
            },

            requestError: function(config) {
                return $q.reject(config);
            },

            response: function (response) {
                if(null != response) {
                    var temp = response.headers('ecodes');
                    var tempHash = response.headers('ecodeshash');
                    var temp2 = response.headers('configurations');
                    var temp2Hash = response.headers('configFile');
                    // var fbid = response.headers('fbAppId');
                    // var fbidHash = response.headers('fbAppIdObj');

                    if (temp != 'test' && temp != null) {
                        temp = JSON.parse(temp);
                        console.log("----{ Setting ecodes}----");
                        localStorageService.set("ErrorCodes", temp.errorCodes);
                        localStorageService.set('ecodeshash', tempHash)
                    }

                    if (temp2 != 'equal' && temp2 != null) {
                        temp2 = JSON.parse(temp2);
                        console.log("----{ Setting }----");
                        localStorageService.set("configurations", temp2);
                        localStorageService.set("configFile", temp2Hash);
                        localStorageService.set("appName", temp2.appName);

                    }
                    // if (fbid != 'equal' && fbid != null) {
                    //     console.log("----{ Setting fbid}----",fbid);
                    //     localStorageService.set("fbAppId", fbid);
                    //     localStorageService.set("fbAppIdObj", fbidHash);
                    //
                    // }
                    if(null != response.data && response.config.url === "/api/loginApi") {
                        console.log("REsponse in interceptor ::: ", response);
                        localStorageService.set('auth_token',response.data.auth_token);
                        localStorageService.set('refreshToken',response.data.refreshToken);
                    }
                }
                return response || $q.when(response);
            },

            // Revoke client authentication if 401 is received

            responseError : function (response) {
                //console.log("HTTP INTERCEPTER :: "+JSON.stringify(response));
                var deferred = $q.defer();
                if(response.status === 401 && (response.config.errorCount === undefined || response.config.errorCount < 1)) {
                    if(response.config.errorCount === undefined) {
                        response.config.errorCount = 0;
                    } else {
                        response.config.errorCount += 1;
                    }
                    var token = localStorageService.get('refreshToken');
                    $injector.get("$http").post( '/api/refresh', {refreshToken: token}).then(function(r) {
                        //console.log("Here in Refresh REsponse :: ", r);
                        if (r.status === 200) {
                            localStorageService.set("auth_token", r.data.data.response.token);
                            localStorageService.set("refreshToken", r.data.data.response.refreshToken);
                            response.config.headers.Authorization = 'Bearer '+localStorageService.get("auth_token");
                            response.config.headers.token = localStorageService.get("auth_token");
                            $injector.get("$http")(response.config).then(function(resp) {
                                deferred.resolve(resp);
                            },function(resp) {
                                deferred.reject();
                            });
                        } else {
                            
                            deferred.reject();
                        }
                    }, function(response) {
                        deferred.reject();
                        console.log("Promise Failed ::: ", status);
                        localStorageService.clearAll();
                        $location.path("/login");
                        return;
                    });
                    return deferred.promise;
                } else {
                    if(response.config.errorCount != undefined && response.config.errorCount >= 0) {
                        console.log("Promise Failed ::: ", status);
                        localStorageService.clearAll();
                        $location.path("/login");
                    }
                    return $q.reject(response);
                }
            }

        }
    }])
    return TokenInterceptorService;
});

