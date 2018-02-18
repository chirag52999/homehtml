module.exports = function (serverInfo){
    
    return {
        forgotPassword: function(req,res)       {
            console.log("Reset password Api Called up");
            res.json({status:"success"});
        }
    }
};