
// Table for token of each user
var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
	macAddress : {type :String,index:{unique : true},upsert : true},
	userToken : {type : String, index: {unique:true},upsert : true}

});

module.exports=mongoose.model('token',userSchema);
