module.exports = function(mongoose,environment) {
    mongoose.Promise = global.Promise;
    console.log("in database .js ",environment)
    if(environment === "production") {
        var dbURI = 'mongodb://10.0.0.165:27017/dspp'; //'mongodb://localhost/dspp'
    }
    else
    {
        var dbURI = 'mongodb://127.0.0.1:27017/dspp'; //'mongodb://localhost/dspp'
    }
    console.log("in database .js dbURI",dbURI)
    var connection = mongoose.createConnection(dbURI,{ server: { poolSize: 5 } });

    // When successfully connected
    connection.on('connected', function () {
        console.log('Mongoose connection open to: ' + dbURI);
    });

    // If the connection throws an error
    connection.on('error',function (err) {
        console.log("---ALERT---");
        console.log('Mongoose default connection error: ' + err);
        console.log("--ENDS--")
    });

    // When the connection is disconnected
    connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    return connection;
}
