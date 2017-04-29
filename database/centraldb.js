// Central Table 

var mongoose=require('mongoose');

var keySchema=mongoose.Schema({
  notificationKey:{type:String},
  valueAmount:{type:Number},
  userid:{type:String}
});

keySchema.index({ notificationKey: 1, valueAmount: 1,userid :1 }, { unique: true },{upsert : true});

module.exports=mongoose.model('centraldb',keySchema);