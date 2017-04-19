// Central Table 

var mongoose=require('mongoose');

var keySchema=mongoose.Schema({
  notificationKey:{type:String,upsert:true},
  valueAmount:{type:Number,upsert:true},
  token:{type:String,upsert:true}
});

keySchema.index({ notificationKey: 1, valueAmount: 1,token :1 }, { unique: true });

module.exports=mongoose.model('centraldb',keySchema);