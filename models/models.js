module.exports = function(connection) {

   var saveAdDocument = require("./saveAd")(connection);
   var Templates = require("./template")(connection);
    return {
        saveNewAd: saveAdDocument,
        template: Templates

    }
}