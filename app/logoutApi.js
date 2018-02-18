module.exports = function(serverInfo){
    
    return {
        logout: function(req,res){
            console.log("Log-out Api Called");
            console.log("--Request Headers-- \n Auth-Token is :",req.headers.authorization, "\n AppName is : ",req.headers.appname,"\n ---ENDS---");
            res.json({status: 'success'});
        }
    }
};