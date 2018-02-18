var mongooseObj = require('mongoose');

module.exports = function(connection) {

    var Schema = mongooseObj.Schema;

    // create a schema
    var ad_schema = new Schema({
        client_name: String,
        app_name: String,
        user_id: String, //unique number from API response
        user_name:String,
        editedBy:String,
        editedByid:String,
        published:Boolean,
        ad_id:Number,
        version:Number,
        created_at    : { type: Date },
        updated_at    : { type: Date },
        ad_info: Schema.Types.Mixed,
        ad_target: Schema.Types.Mixed,
        ad_budget: Schema.Types.Mixed,
        ad_banner_design : Schema.Types.Mixed,
        ad_landing_page : Schema.Types.Mixed,
        ad_summary_page: Schema.Types.Mixed
    },{collection: 'saved_ads'});

    ad_schema.pre('save', function(next){
        var currentDate = new Date();  // delete the dot and everything after
        this.updated_at = currentDate;
        if (!this.created_at) {
            this.created_at = currentDate;
        }
        next();
    });

    // the schema is useless so far
    // we need to create a model using it
    var SavedAds = connection.model('saved_ads', ad_schema); //compiling our schema into a Model which is equivalent to mongo document.
    return SavedAds;
}





