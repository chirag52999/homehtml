/**
 * Created by chalk on 9/8/16.
 */

module.exports = function(serverInfo){
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

    return {
        changePassword: function(req,res){
            console.log("Change passwoed api reached");
            var request = require('request');
            var oldPsw = req.body.oldpasswd;
            var newPsw = req.body.newpasswd;
            var token = req.headers.token;

            var options = {
                url: "http://"+serverInfo.apiHost+':'+serverInfo.backend_port+'/dentsu/updatepassword/v1',
                json:{'oldpasswd' : oldPsw, 'newpasswd' : newPsw},
                headers: {'Content-Type':'application/json','Authorization': 'Bearer '+token}
            };
            if(isVoid(token)){
                res.json(401, {
                    "status": 401,
                    "message": "---Un-Authorized access--- "
                });
            }else {
                request.post(options, function (error, response, body) {
                    try {
                        if (body != undefined && response != undefined) {
                            if (!error && response.statusCode == 200 && body.status == 0) {
                                console.log("sucess pass changed ")
                                res.json({"status": "success"});
                            } else if (response.statusCode == 401) {
                                console.log("error unothorized")
                                res.send(401, {"message": "UnAuthorized"});
                            } else {
                                console.log("invaid response or body");
                                res.json({"status": "failure", "message": "Undefined body or response"});
                            }
                        } else {
                            console.log(body);

                            res.json({"status": "Undefined body or response"});
                        }
                    } catch (e) {
                        console.trace(e);
                        res.json({"status": "failure"});
                    }
                });
            }
        }
    }
};