// Central Table 

var mongoose=require('mongoose');

var keySchema=mongoose.Schema({
  notificationKey:{type:String},
  valueAmount:{type:Number},
  token:{type:String}
});

keySchema.index({ notificationKey: 1, valueAmount: 1,token :1 }, { unique: true },{upsert : true});

module.exports=mongoose.model('centraldb',keySchema);