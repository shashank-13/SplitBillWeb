var mongoose=require('mongoose');

var keySchema=mongoose.Schema({
	groupName : {type :String,index:{unique : true},upsert : true},
	notificationKey : {type : String, index: {unique:true},upsert : true}

});

/*mongoose.connect('mongodb://localhost:27017/moneydb');
mongoose.connection.on('open', function() { console.log('Mongoose connected.'); });*/
module.exports=mongoose.model('notification',keySchema);