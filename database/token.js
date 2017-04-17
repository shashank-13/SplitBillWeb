
// Table for token of each user
var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
	macAddress : {type :String,index:{unique : true}},
	userToken : {type : String, index: {unique:true}}

});

mongoose.connect('mongodb://localhost:27017/moneydb');
mongoose.connection.on('open', function() { console.log('Mongoose connected.'); });
module.exports=mongoose.model('token',userSchema);
