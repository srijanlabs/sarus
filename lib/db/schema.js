///////////////////////////////////////
//      Mongo DataBase And Schema    //
///////////////////////////////////////

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var feedSchema = new Schema({
     index: Number,
     title: String,
     url:String,
     description: String,
     pubDate: Date

});


mongoose.model('Feed', feedSchema);
