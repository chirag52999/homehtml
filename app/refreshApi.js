module.exports = function (serverInfo) {

    return {
        refresh: function (req, res) {
            console.log("Here in refresh", req.body);
            var request = require('request');
            var refreshData = {
                url: 'http://'+serverInfo.apiHost+':'+serverInfo.backend_port+'/bh/refreshtoken/v1',
                method: 'post',
                json: {refreshToken: req.body.refreshToken},
                headers: {'Content-Type': 'application/json'}
            };
            console.log("Refresh Request Data ", refreshData);
            function callback(error, response, body) {
                if(!error && response.statusCode === 200) {
                    console.log("Got Refresh Response ::: ", body, response.body);
                    res.json({"status": "success", data: body});
                }
                else {
                    console.log("Got Refresh Error ::::", error);
                    res.send(419, {"status": "failure", "message": "Unauthorized"});
                }
            }
            request(refreshData, callback);

        }
    }
};