module.exports = function(app,models, serverInfo) {
    var url = require('url');
    var cors = require('cors');
    var qs = require('qs');
    var request = require('request');
    //APPLICATION CONFIGURATION / CLIENT REQUEST AUTHENTICATION
    var routeData = {
        'ds':{'index':'index','shared':'shared/','partial':'partials/','auth':'partials/auth/', 'template':'&tmplid=2002',
            'routePaths': {'login':'/home','logout':'http://localhost:8080/#/login','appName':'DentSu'
            }
        }
    };

    var routePath = {
        'dstest':routeData.ds
    };

    //TODO
    function browserCheck(req, res, next){
        var UAParser = require('ua-parser-js'); // HAVE INSTALLED UA-PARSER-JS
        var parser = new UAParser();
        var ua = req.headers['user-agent'];     // user-agent header from an HTTP request
        console.log("USER AGENT -->",req.params.name);
        var userUA = parser.setUA(ua);
        console.log('userUA.getBrowser().name->',userUA.getBrowser().name);
        console.log('userUA.getOS().name->',userUA.getOS().name);
        next();
    }
    // APPLICATION CONFIG ENDS --*/

    //BASIC ROUTING

    var login_api = require ('./loginApi.js')(serverInfo);
    var sign_up = require ('./signUpApi.js')(serverInfo);
    console.log("1. Api route is set for LoginAPI");


    var forgotPassword_api = require('./forgotPasswordApi.js')(serverInfo);
    console.log("3. Api route is set for Forgot Password API");
    var config = require('./configurations')(serverInfo);
    var AlertECodes = require('../public/resources/error-codes.json');

    var appConfigurations = config.appConfigurations;
    var appPath = config.appPath;
    var globalConfigurations = config["globalConfiguration"];
    // routing actions --
    app.get('/',browserCheck, appendHeader, function (req, res){ // NOTE : here we have parallel callback functions so next(), will automatically take us to next callback function
        console.log("from /");
        res.render('index');
    });
    app.get('//-',browserCheck, appendHeader, function (req, res){ // NOTE : here we have parallel callback functions so next(), will automatically take us to next callback function
        console.log("from landing page index");
        res.render('lp');
    });
    app.get('//-shared_views/:profile', appendHeader, function (req, res) {
        var profile = req.params.profile;
        res.render('shared_views/'+profile );
    });
    app.get('/partials/:name', appendHeader, function (req, res) {
        var name = req.params.name;
        console.log("Name [" + name + "]");
        res.render('partials/' + name);
    });
    app.get('/shared_views/:profile', appendHeader, function (req, res) {
        var profile = req.params.profile;
        res.render('shared_views/'+profile );
    });

    function validUrl(req, res, next) {
        console.log("REQUEST RECIEVED FOR URL  :: ",req.query.url);
        req.query = req.query || qs.parse(url.parse(req.query.url).query);
        if (req.query.url == null) {
            next(new Error("No url specified"));
        } else if (typeof(req.query.url) !== "string" || url.parse(req.query.url).host === null) {
            next(new Error("Invalid url specified: " + req.query.url))
        } else {
            next();
        }
    }
    app.post('/api/loginApi',login_api.login);
    app.post('/api/signUpApi',sign_up.signUp);
    app.post('/api/forgotPassword',forgotPassword_api.forgotPassword);

    function appendHeader(req, res, next) {
        var ecodes = JSON.stringify(AlertECodes);
        var ErrorSum=req.headers.ecodeshash;
        var host = req.headers.host.split(":");
        var value = appPath[host[0]];
        var env = serverInfo.environment;
        if(env === "production" || env === "staging"){
            env = serverInfo.environment;
        }else{
            env = "other"
        }
        if(null === value || undefined === value){
            console.log("Got Request For ",value);
            res.send("404", "404: Page Not Found");
            return;
        }else {
            var configurations = JSON.stringify(value);
        }
        var configFile=req.headers.configfile;
        var crypto = require('crypto');
        var request = req;
        if(null === request || undefined === request){
            console.log("Got Request For ",request);
            res.send("404", "404: Page Not Found");
            return;
        }
        var hash = crypto.createHash('md5').update(ecodes).digest('hex');
        var hash2 = crypto.createHash('md5').update(configurations).digest('hex');
        if(hash != ErrorSum){
            res.set('ecodes',ecodes);
            res.set('ecodeshash',hash);
        }
        else{
            res.set('ecodes','test');
            res.set('ecodeshash','test');
        }

        if(hash2 != configFile){
            res.set('configurations',configurations);
            res.set('configFile',hash2);
        }else{
            res.set('configurations','equal');
            res.set('configFile','equal');
        }
        next();
    }

};
