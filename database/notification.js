//Table for notification of group

var mongoose=require('mongoose');

var keySchema=mongoose.Schema({
	groupName : {type :String,index:{unique : true},upsert : true},
	notificationKey : {type : String, index: {unique:true},upsert : true}

});


module.exports=mongoose.model('notification',keySchema);