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


	var payLoad={notification:{title:"Notifications..",body:"Hello from nodejs"}};

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
test1:function(req,res)
{
	/*token.remove({userToken:'esjpmh0oEF0:APA91bH3HH3zbx-AWGwZqoypHWE3HbrE33XxVmV2BEP3pYpJcszQeqMNtXO6VKz6cPAN9dW_oJVb4d3tDEiKc2ptp8niRGxzuwGHiygmr0hQt-T3jYVJyzdDmqGjKavKcB4NkDFPj2C2'},function(err)
	{
		if(err)
			throw err;
	});*/
	token.find({},function(err,users)
	{
		users.forEach(function(user)
		{
			console.log(user.macAddress);
			console.log(user.userToken)
		});
	});

	res.send('Database modified succesfully');
},

test2:function(req,res)
{

	notify.find({},function(err,users)
	{
		users.forEach(function(user)
		{
			console.log(user.groupName);
			console.log(user.notificationKey);
		});
	});

	res.send('Database modified succesfully');
},
insertvalue:function(req,res)
{
var key1,key2;
	key1='APA91bHybYGoTH00ZMGdZQBS5qqOhPsI0c5g83nle03TvL4SOxv_6bsP6prY3Pnil9LyaTrje8xXPfSWq_UFetkcnAwyCDDRpnPQQSN7wTPSCp76LQQVlGA';
	key2='APA91bHciIjPaR58LhDr8TQ8pRq0E64LHGEKb_rE1fihvbtSrr7bHpRpRbLyD6Tca-onzpmbIlO3APrbqlNzoFB1RYhARnTdZcvN6mM7m-g6774sFEDKPkA';
	var token1='ccUcMskEJYg:APA91bH-_cDWHJNjutrY7_nvh8Ra8kp-41z_-ml6IAXDUCmHLvQ8TbOEk5AG9nt4r9Q26fPXMjKUj0B3FFx1pKi43nLrwMlwxPqcbAsR6ykI6G6ZriJooU8uKngNoKbgpBdk83qbVohl';
	var token2='fXLBSeWgMYo:APA91bEx6EnuDhqH6jYJbYIhJQ1VujI_g2EtgEmTohqAuPErCnDxiNLNSZazAayhgb14-G0A_GRt2gXeFIokjenGDxBPHoeVt-7_2UQ3KAHOhkyCtJIm_hW4umDV6F3ZEJ6ecCgrTogD';

	centraldb.update({notificationKey:key1,token:token1},{$set:{notificationKey:key1,token:token1,valueAmount:70}},{upsert:true,multi:true},function()
	{
		console.log('Notification updated');
	});

},
insertgroup:function(req,res)
{
	var group1,group2,key1,key2;
	group1='mygroup';
	group2='mahisbathan';
	key1='APA91bHybYGoTH00ZMGdZQBS5qqOhPsI0c5g83nle03TvL4SOxv_6bsP6prY3Pnil9LyaTrje8xXPfSWq_UFetkcnAwyCDDRpnPQQSN7wTPSCp76LQQVlGA';
	key2='APA91bHciIjPaR58LhDr8TQ8pRq0E64LHGEKb_rE1fihvbtSrr7bHpRpRbLyD6Tca-onzpmbIlO3APrbqlNzoFB1RYhARnTdZcvN6mM7m-g6774sFEDKPkA';
	var token1='ccUcMskEJYg:APA91bH-_cDWHJNjutrY7_nvh8Ra8kp-41z_-ml6IAXDUCmHLvQ8TbOEk5AG9nt4r9Q26fPXMjKUj0B3FFx1pKi43nLrwMlwxPqcbAsR6ykI6G6ZriJooU8uKngNoKbgpBdk83qbVohl';
	var token2='fXLBSeWgMYo:APA91bEx6EnuDhqH6jYJbYIhJQ1VujI_g2EtgEmTohqAuPErCnDxiNLNSZazAayhgb14-G0A_GRt2gXeFIokjenGDxBPHoeVt-7_2UQ3KAHOhkyCtJIm_hW4umDV6F3ZEJ6ecCgrTogD';

	notify.update({groupName:group1},{$set:{groupName:group1,notificationKey:key2}},{upsert:true,multi:true},function()
	{
		console.log('Notification updated');
	});

	/*notify.update({groupName:group2},{$set:{groupName:group2,notificationKey:key2}},{upsert:true,multi:true},function()
	{
		console.log('Notification updated');
	});*/

},
inserttoken:function(req,res)
{
var token1='ccUcMskEJYg:APA91bH-_cDWHJNjutrY7_nvh8Ra8kp-41z_-ml6IAXDUCmHLvQ8TbOEk5AG9nt4r9Q26fPXMjKUj0B3FFx1pKi43nLrwMlwxPqcbAsR6ykI6G6ZriJooU8uKngNoKbgpBdk83qbVohl';
var add1='64:cc:2e:2b:4f:c3';
var add2='08:00:27:78:df:43';
var temp='fuckoff';
var token2='fXLBSeWgMYo:APA91bEx6EnuDhqH6jYJbYIhJQ1VujI_g2EtgEmTohqAuPErCnDxiNLNSZazAayhgb14-G0A_GRt2gXeFIokjenGDxBPHoeVt-7_2UQ3KAHOhkyCtJIm_hW4umDV6F3ZEJ6ecCgrTogD';
token.update({macAddress:add1},{$set:{macAddress:add1,userToken:token1}},{upsert:true ,multi:true},function()
{
	console.log('Token updated Successfully');
});

token.update({macAddress:add2},{$set:{macAddress:add2,userToken:token2}},{upsert:true,multi:true},function()
{
	console.log('Token updated Successfully');
});

},

deletedata:function(req,res)
{
   token.remove({},function(err)
   {
   		if(err)
   			throw err;
   });
   res.send('Database deleted succesfully');
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