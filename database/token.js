
// Table for token of each user
var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
	macAddress : {type :String , unique:true},
	userToken : {type:String , unique : true}

});

module.exports=mongoose.model('token',userSchema);
