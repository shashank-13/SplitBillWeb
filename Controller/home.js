var admin = require('firebase-admin');
var token=require('../database/token.js');
var notify=require('../database/notification.js');
var centraldb=require('../database/centraldb.js');

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
	var temp_group='mygroup'
   token.find({},function(err,users)
    {
      users.forEach(function(user)
      {
        console.log(user.userToken);
        console.log(user.macAddress);
      });
    });

	res.send('Database Test Completed');
},
insertManual:function(req,res)
{
    var registrationToken='cDULvImJF1s:APA91bFTRmEbG2979SyKzrGWIh3lu8Oe3-fP3Sat1vAvEygk486OQdJkqfTccZQw2qn8qga0x-g1qSSUAw6pjR_QrXoleWtiFNdLmEuxIB51s7GTkYfqFrJkzyH5J2EAVm7cSl23BpRF';
    var notification='APA91bHciIjPaR58LhDr8TQ8pRq0E64LHGEKb_rE1fihvbtSrr7bHpRpRbLyD6Tca-onzpmbIlO3APrbqlNzoFB1RYhARnTdZcvN6mM7m-g6774sFEDKPkA';
    var newRow = new centraldb({notificationKey:notification,valueAmount:0,token:
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