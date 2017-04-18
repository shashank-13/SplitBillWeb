// Central Table 

var mongoose=require('mongoose');

var keySchema=mongoose.Schema({
  notificationKey:{type:String,upsert:true},
  valueAmount:{type:Number,upsert:true},
  token:{type:String,upsert:true}
});

module.exports=mongoose.model('centraldb',keySchema);