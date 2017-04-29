
// Table for name of each user
var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
	userid : {type :String , unique:true},
	userName : {type:String , unique : true}
});

module.exports=mongoose.model('username',userSchema);