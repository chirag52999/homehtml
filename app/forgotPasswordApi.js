module.exports = function (serverInfo){
    
    return {
        forgotPassword: function(req,res)       {
            console.log("forgot password Api Called up");
            /*res.json({status:"success"});*/
            var request = require('request');
           // console.log(request);
            var userName = req.body.userName;
            var portalName = req.body.portalName;
            var appName =req.headers.appname
            //var host = req.headers.host.split('.')[0];
            //res.json({"status": "success", "url":"Click here..: www.dentsu.com/resetPassword/av1?username=test&appname=ds"});
            var url = "http://"+serverInfo.apiHost+':'+serverInfo.backend_port+"/dentsu/resetpassword/v1?" +
                                                            "username="+userName+"&appname="+appName+"&portalName="+portalName;
            console.log("password rcovery url: "+url)
            request(url, function (error, response, body) {
                try {
                    if (body != undefined && response != undefined) {
                        body = JSON.parse(body);
                        if (!error && response.statusCode == 200 && body.status == 0) {
                            res.json({"status": "success"});
                        } else {
                            console.log(body);
                            res.json({"status": "failure"});
                        }
                    } else {
                        console.log(body);
                        res.json({"status": "Undefined body or response"});
                    }
                }catch(e) {
                    console.trace(e);
                    res.json({"status": "failure"});
                }
            });
        }
    }
};