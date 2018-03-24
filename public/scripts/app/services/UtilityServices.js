define(['angular'], function (angular) {
    'use strict';

    var UtilityServices = angular.module('UtilityServices', []);

    UtilityServices.service('UtilityServices', ['$location','$log','$http','localStorageService','$window',
        function ($location,$log,$http,localStorageService,$window) {
        return {
            isVoid: function(obj){
                switch(typeof(obj)){

                    case "undefined":
                    case "object":
                        for(var x in obj){
                            if(obj.hasOwnProperty(x))
                                return false;
                            else
                                return true;
                        }
                        return true;
                    case "number":
                    case "boolean":
                        return false;
                        break;
                    case "string":
                        if(obj == "")
                            return true;
                        else
                            return false;
                    default:
                        return false;
                }
            },
            emailValid: function (email) {


                if(this.isVoid(email)){
                    return false;
                }else{
                    var atpos = email.indexOf("@");
                    var dotpos = email.lastIndexOf(".");
                    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            phoneValid: function (phone) {
                // $log.debug("phn is bfr string",phone)
                
                var phnString=phone+""
                var res = phnString.substring(0, 1);
                // $log.debug("the first char is ",res)
                if(res==="0"){
                    phnString= phnString.substring(1, phnString.length);
                }else {
                    phnString=phnString;
                }
                // $log.debug("phn is ",phnString)
                var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3,6})$/;
                if(this.isVoid(phnString)){
                    return false;
                }else {
                    if ((phnString.match(phoneno))) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
             validateUrl: function (url)
            {

             //    var regexp =  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
                //var regexp = new RegExp("^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
                //var regexp =  /^(ftp|http|https):\/\/[^ "]+$/;
                var regexp =  /^((?:http|ftp)s?:\/\/)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;

                // var regexp =  /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
                // $log.info("url to validate is :",url);
                if(!regexp.test(url))
                {
                    // $log.debug("A invalid URL");

                    return true;
                }
                else {
                    // $log.debug("A valid URL");
                    return false;
                }

            },
            validUrlwithhttpp: function(url){
                //var regexp =  /^((?:http|ftp)s?:\/\/)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;
                var regexp =/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
                if(this.isVoid(url)){
                    return false;
                }
                else {
                    if(!regexp.test(url))
                    {
                        return false;
                    }
                    else {

                        return true;
                    }
                }

            },
            detectBrowser:function(){
                var userAgent = $window.navigator.userAgent;
                var browsers = {iexp : /.net/i,chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i, edge:/Edge/i};
                var agents = [];
                for(var key in browsers) {
                    if (browsers[key].test(userAgent)) {
                        agents.push(key);
                    }
                };
                if(agents.indexOf('edge') < 0)
                    return agents[0];
                else
                    return 'edge';
                return 'unknown';
            },
            get_browserVersion: function (){
                var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if(/trident/i.test(M[1])){
                    tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
                    return (tem[1]||'');
                }
                if(M[1]==='Chrome'){
                    tem=ua.match(/\bOPR\/(\d+)/)
                    if(tem!=null)   {return tem[1]}
                }
                M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
                if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
                return  M[1]


            },
        }
    }])
    return UtilityServices;
});

