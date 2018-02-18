module.exports = function (serverInfo) {
    var AlertECodes = require('../public/resources/error-codes.json');

    function isVoid(obj){
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
    };
    function buildRegions(regions) {
        var regionsByCountry={
            "Japan":regions
        }
        return regionsByCountry;
    }
    return {
        login:function(req,res)  {

            console.log("Log-in Api Call Invoked",req.body);
            var request = require('request');
            var username = req.body.userName;
            var password = req.body.password;
            var appName = req.headers.appname;
            var loginType = req.body.loginType;
            console.log("username:", username, "password: ", password, "appName: ", appName);


            // CALLING AUTHENTICATION API
            var chalkLoginURL = {
                url: 'http://'+serverInfo.apiHost+':'+serverInfo.backend_port+'/dentsu/login/v1',
                method:'post',
                json: {"username" : username,"password" : password,"appname":appName, "loginType":loginType,"portalName": req.body.portalName},
                headers: {'Content-Type': 'application/json'}
            };
            console.log("Chalk Login Url",chalkLoginURL);

            request(chalkLoginURL, function(error, response, body) {

                try {
                  //  console.log("API Call Success with status code: ",response.statusCode);
                    console.log("Error details: ",body.response.regions);
                    console.log("Response from API: ",(null===body.response?"Response is null":body.response.userInfo));
                    if(!error && response.statusCode == 200 ) { //body != undefined && body.response != undefined && body.status != -1
                        var responseData;
                        responseData = body;
                        if(responseData.status == 0) // status = 0 means username /password was correct and are logged in
                        {
                            console.log("Setting response...");
                            var userInfo = responseData.response.userInfo;
                            var chalkToken = responseData.response.token;
                            var clientlist = JSON.stringify(responseData.response.clientlist);
                            var iabcategories = JSON.stringify(responseData.response.iabcategories);
                            var countries = JSON.stringify(responseData.response.countries);
                            if(userInfo!=null && chalkToken!=null && clientlist!=null && iabcategories!=null && countries!=null){
                                var loginResponse = {
                                    "status": "success",
                                    "message": "",
                                    "userInfo": userInfo,
                                    "auth_token": chalkToken,
                                    "refreshToken":responseData.response.refreshToken,
                                    "clientlist" : clientlist,
                                    "iabcategories" : iabcategories,
                                    "countries" : countries,
                                    "AlertErrorCodes":AlertECodes,
                                    "client":JSON.parse(clientlist)[0],
                                    "clientLogo":"",
                                    "userAcess":userInfo.userAccess,
                                    "appTierId":userInfo.appTierId,
                                    "tiers":responseData.response.tiers,
                                    "prefectureData":(!isVoid(responseData.response) && !isVoid(responseData.response.regions))?buildRegions(responseData.response.regions):[]
                                };
                                res.json(loginResponse);
                                //console.log("data sent to UI is: ",loginResponse);
                            }else {
                                res.json({
                                    "status": "failure",
                                    "message": "Incomplete Data, Server Error"
                                });
                            }

                        }else {
                            res.json({
                                "status": "failure",
                                "message": "Invalid Username or Password",
                                "errorcode": responseData.ecode
                            });
                        }

                    }else {
                        res.json({
                            "status": "failure",
                            "message": "Something went wrong",
                            "errorcode": 500
                        });
                    }

                }catch(e){
                    console.trace(e);
                    res.json({
                        "status": "failure",
                        "message": "exception occured",
                        "errorcode": 500
                    });
                }
            });
            // AUTHENTICATION ENDS --
        }
    }
};