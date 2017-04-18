var admin = require('firebase-admin');
var token=require('../database/token.js');
var notify=require('../database/notification.js');
var centraldb=require('../database/centraldb.js');
// Whole module for testing 
module.exports={
index:function(req,res)
{
	var registrationToken1='cDULvImJF1s:APA91bFTRmEbG2979SyKzrGWIh3lu8Oe3-fP3Sat1vAvEygk486OQdJkqfTccZQw2qn8qga0x-g1qSSUAw6pjR_QrXoleWtiFNdLmEuxIB51s7GTkYfqFrJkzyH5J2EAVm7cSl23BpRF';
	var registrationToken2='fXLBSeWgMYo:APA91bEx6EnuDhqH6jYJbYIhJQ1VujI_g2EtgEmTohqAuPErCnDxiNLNSZazAayhgb14-G0A_GRt2gXeFIokjenGDxBPHoeVt-7_2UQ3KAHOhkyCtJIm_hW4umDV6F3ZEJ6ecCgrTogD';
    
    var notificationKey = "APA91bHX7syhgU7nHZJyILWs0H-mPCbI7Zo3OT2WE57e5P-gCJAVK7WCkXCxDnYZGQbm3m4iurwjlZwjWCgWo3y8OpvsZGfwKjVvCCj3nxQ2ld_mVGEkmmQ";

	var registrationToken =[registrationToken1,registrationToken2];

	var payLoad={notification:{title:"Notifications..",message:"Hello from nodejs"}};

	admin.messaging().sendToDevice(notificationKey,payLoad).then(function(response)

	{
		console.log("Successfully message ",response);
	})
	.catch(function(error)
	{
     console.log('Error Sending message'+error);
	});

res.send('Message Deliverd')
},
test:function(req,res)
{
   centraldb.find({},function(err,users)
    {
      users.forEach(function(user)
      {
        console.log(user.notificationKey);
        console.log(user.valueAmount);
        console.log(user.token);
      });
    });
    

	res.send('Database Test Completed');
},
insertManual:function(req,res)
{
    var registrationToken='fXLBSeWgMYo:APA91bEx6EnuDhqH6jYJbYIhJQ1VujI_g2EtgEmTohqAuPErCnDxiNLNSZazAayhgb14-G0A_GRt2gXeFIokjenGDxBPHoeVt-7_2UQ3KAHOhkyCtJIm_hW4umDV6F3ZEJ6ecCgrTogD';
    var notification='APA91bHybYGoTH00ZMGdZQBS5qqOhPsI0c5g83nle03TvL4SOxv_6bsP6prY3Pnil9LyaTrje8xXPfSWq_UFetkcnAwyCDDRpnPQQSN7wTPSCp76LQQVlGA';
    var newRow = new centraldb({notificationKey:notification,valueAmount:40,token:
     	registrationToken});
     	  newRow.save(function(err,record)
	{
	if(err)
	throw err;
	console.log('Row added Successfully');
	console.log(record.notificationKey);
	console.log(record.valueAmount);
	console.log(record.token);
	  res.status(201).json({message : "Token updated succesfully"});
	});    


    
}


};