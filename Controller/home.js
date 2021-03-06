var admin = require('firebase-admin');
var token=require('../database/token.js');
var notify=require('../database/notification.js');
var centraldb=require('../database/centraldb.js');
var request=require('request');
var namedb=require('../database/username.js');

function makerequests(res)
{
	res.send('Database Test Completed');
}
// Whole module for testing
module.exports={
index:function(req,res)
{
	var API_KEY='AIzaSyDWaNecbKKuLP9ndQDMMYPLLrtawaN0Fxk';
   	var SENDER_ID='178770510313';

	let options = {
    url: 'https://android.googleapis.com/gcm/notification?notification_key_name=genygroup',
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "key=" + API_KEY,
        "project_id": SENDER_ID
    }
};

request(options, function (error, response, body) {
    if (!error) {
        res.json(body);
    }
    else {
        res.json(error);
    }
});
},
test:function(req,res)
{
	var global_id="CpjMN5mbUWb2EjkJVylLmv7Iz203";
   centraldb.find({},function(err,users)
    {
      users.forEach(function(user)
      {
        console.log(user.notificationKey);
        console.log(user.valueAmount);
        console.log(user.userid);
      });
      makerequests(res);
    });
    

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
			console.log(user.userid);
			console.log(user.userToken);
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
test3:function(req,res)
{

	namedb.find({},function(err,users)
	{
		users.forEach(function(user)
		{
			console.log(user.userid);
			console.log(user.userName);
		});
	});

	res.send('Database modified succesfully');
},

insertvalue:function(req,res)
{
var key1,key2,key3,key4;
	key1='APA91bHybYGoTH00ZMGdZQBS5qqOhPsI0c5g83nle03TvL4SOxv_6bsP6prY3Pnil9LyaTrje8xXPfSWq_UFetkcnAwyCDDRpnPQQSN7wTPSCp76LQQVlGA';
	key2='APA91bHciIjPaR58LhDr8TQ8pRq0E64LHGEKb_rE1fihvbtSrr7bHpRpRbLyD6Tca-onzpmbIlO3APrbqlNzoFB1RYhARnTdZcvN6mM7m-g6774sFEDKPkA';
	key3='APA91bF3vYv61Mtys2jJMb0gw_2UeEzh65wrogzYexpw6lijR1ec6Li5BXvop6RoLuKVJ8s5j_Gi2Ub6JMGz6JSlLWuQTJwzjxGqC-lQ_nw0w_CGuBQ-gsc';
	key4='APA91bGsWEEJwXR6OcXrV7as-KsLSOlRDHsBj6gUK-eq5qyydnj6voqjEuRLZqCu5NSk81hqBWR3NuiB4EEZ2vRHSElPiVlGXd1lI5Eq4ho0_vTRvHoZ7yI';


	var token1='ccUcMskEJYg:APA91bH-_cDWHJNjutrY7_nvh8Ra8kp-41z_-ml6IAXDUCmHLvQ8TbOEk5AG9nt4r9Q26fPXMjKUj0B3FFx1pKi43nLrwMlwxPqcbAsR6ykI6G6ZriJooU8uKngNoKbgpBdk83qbVohl';
	var token2='fXLBSeWgMYo:APA91bEx6EnuDhqH6jYJbYIhJQ1VujI_g2EtgEmTohqAuPErCnDxiNLNSZazAayhgb14-G0A_GRt2gXeFIokjenGDxBPHoeVt-7_2UQ3KAHOhkyCtJIm_hW4umDV6F3ZEJ6ecCgrTogD';

	/*centraldb.update({notificationKey:key1,token:token1},{$set:{notificationKey:key1,token:token1,valueAmount:70}},{upsert:true,multi:true},function()
	{
		console.log('Notification updated');
	});*/

	centraldb.find(  {notificationKey : key1},function(err, users) {
	   if(!err){
	   users.forEach(function(user)
		{
			user.notificationKey=key3;
			 user.save(function(err,user)
			 	{
			     console.log('User saved:', user);
			 });
		});
	    }
	                    }

	    );

	centraldb.find(  {notificationKey : key2},function(err, users) {
	   if(!err){
	   users.forEach(function(user)
		{
			user.notificationKey=key4;
			 user.save(function(err,user)
			 	{
			     console.log('User saved:', user);
			 });
		});
	    }
	                    }

	    );

},
insertgroup:function(req,res)
{
	var group1,group2,key1,key2;
	group1='mygroup';
	group2='mahisbathan';
	key1='APA91bHWrPGHBWLf5pIgst9jIFW7V3aiF61GVeppJHS-sujIHOJkbTZrebRB4rE8rDFC0bGE5aQZjs54wd7hvLdD75nXjqBez78S3Y0ZN7WG6lieSqF8GKc';
	key2='APA91bGXlluoBdNDaKqhuFkN8M-meJNCjOHXeV1WZ98Z65fdQYK-nLmp-rwWGk07ttivhcWtPnAWV4hy4V1ydwCDUZcc57FWgqxc1Eb-1-BBPYR_0t5qfWQ';
	var token1='ccUcMskEJYg:APA91bH-_cDWHJNjutrY7_nvh8Ra8kp-41z_-ml6IAXDUCmHLvQ8TbOEk5AG9nt4r9Q26fPXMjKUj0B3FFx1pKi43nLrwMlwxPqcbAsR6ykI6G6ZriJooU8uKngNoKbgpBdk83qbVohl';
	var token2='fXLBSeWgMYo:APA91bEx6EnuDhqH6jYJbYIhJQ1VujI_g2EtgEmTohqAuPErCnDxiNLNSZazAayhgb14-G0A_GRt2gXeFIokjenGDxBPHoeVt-7_2UQ3KAHOhkyCtJIm_hW4umDV6F3ZEJ6ecCgrTogD';

	notify.update({groupName:group1},{$set:{groupName:group1,notificationKey:key1}},{upsert:true,multi:true},function()
	{
		console.log('Notification updated');
	});

	notify.update({groupName:group2},{$set:{groupName:group2,notificationKey:key2}},{upsert:true,multi:true},function()
	{
		console.log('Notification updated');
	});

},
inserttoken:function(req,res)
{
var token1='ccUcMskEJYg:APA91bH-_cDWHJNjutrY7_nvh8Ra8kp-41z_-ml6IAXDUCmHLvQ8TbOEk5AG9nt4r9Q26fPXMjKUj0B3FFx1pKi43nLrwMlwxPqcbAsR6ykI6G6ZriJooU8uKngNoKbgpBdk83qbVohl';
var add1='64:cc:2e:2b:4f:c3';
var add2='08:00:27:78:df:43';
var user1='shashank singh';
var user2='shashank kumar';
var token2='fXLBSeWgMYo:APA91bEx6EnuDhqH6jYJbYIhJQ1VujI_g2EtgEmTohqAuPErCnDxiNLNSZazAayhgb14-G0A_GRt2gXeFIokjenGDxBPHoeVt-7_2UQ3KAHOhkyCtJIm_hW4umDV6F3ZEJ6ecCgrTogD';
token.update({macAddress:add1},{$set:{macAddress:add1,userToken:token1,user:user1}},{upsert:true ,multi:true},function()
{
	console.log('Token updated Successfully');
});

token.update({macAddress:add2},{$set:{macAddress:add2,userToken:token2,user:user2}},{upsert:true,multi:true},function()
{
	console.log('Token updated Successfully');
});

},

deletedata:function(req,res)
{
	var key="UgEW2URrSiPvBRNIJSkUlBWaIai2";
  centraldb.update({userid:key},{$set:{valueAmount:0}},{upsert:true,multi:true},function()
	{
		console.log('Central database updated');
	});
   res.send('Database deleted succesfully');
},

insertManual:function(req,res)
{
  var group1,group2,key1,key2;
	group1='mygroup';
	group2='mahisbathan';
	key1='APA91bHWrPGHBWLf5pIgst9jIFW7V3aiF61GVeppJHS-sujIHOJkbTZrebRB4rE8rDFC0bGE5aQZjs54wd7hvLdD75nXjqBez78S3Y0ZN7WG6lieSqF8GKc';
	key2='APA91bGXlluoBdNDaKqhuFkN8M-meJNCjOHXeV1WZ98Z65fdQYK-nLmp-rwWGk07ttivhcWtPnAWV4hy4V1ydwCDUZcc57FWgqxc1Eb-1-BBPYR_0t5qfWQ';
	var token1='cy7jMGpzKnU:APA91bHFBOF2pbWPMh54e9q8v81i_Sud0UPeK1rHilPxozW8djtWfaXiR_LLGGkADjyqDSTYx1EoiD4rHnILgGuhZykM_ZEosFjr7P6N3fv_R7mFuHoKwZ9ptuUwVw2-KSqnKDahK5DU';
	var token2='e_phmXNl-9A:APA91bFP6v4Q4dI4CETVk5TM5dfnKBCz0Gxspz8ZKDjADQKVL5en4Io1uyO7p0A5z51Ic80n_YYdtCD4CcX7mooWesGUIhlnSVjTRhF5XqKzcb67Rg5UafjZIIPkfCRRukkyA2aK2znp';



	centraldb.update({valueAmount:-20},{$set:{valueAmount:0}},{upsert:true,multi:true},function()
	{
		console.log('Central database updated');
	});

}


};
