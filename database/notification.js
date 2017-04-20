//Table for notification of group

var mongoose=require('mongoose');

var keySchema=mongoose.Schema({
	groupName : {type :String,unique : true},
	notificationKey : {type : String, unique:true}

});

module.exports=mongoose.model('notification',keySchema);