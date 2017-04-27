var token=require('../database/token.js');
var notify=require('../database/notification.js');
var request=require('request');
var querydb = require('../database/centraldb.js');
var centraldb=require('../database/centraldb.js');
var asyncLoop = require('node-async-loop');

module.exports={
token:function(req,res)          // For updating the registration token
{
	var result=[];
	var global_data=req.body;
	var global_add,global_name,global_token;
	global_data.forEach(function(entry)
	{
		global_add=entry['address'];
		global_name=entry['name'];
		global_token=entry['token'];
	});
if(global_add && global_token)
{
console.log(global_token);
var prev="null";

token.findOne({macAddress:global_add},function(err,user)
{
	if(!err)
	{
		if(user)
		prev=user.userToken;
		token.update({macAddress:global_add},{$set:{macAddress:global_add,userToken:global_token,user:global_name}},{upsert:true ,multi:true},function()
			{
			console.log('Token updated Successfully');
			});

		if(!(prev==="null"))
		{
			querydb.update({token:prev}, {
                            $set: {
                             token: global_token,
                            }
                        }, {
                             upsert: true,
                            multi: true
                            }, function() {

           querydb.find({token:global_token},function(err,users)
                            {
                 asyncLoop(users,function(item,next)
				{
				
					notify.findOne({notificationKey:item.notificationKey},function(err,user)
					{
						result.push({groupName:user.groupName,notificationKey:user.notificationKey});
						next();
					});

				},function(err)
		{
			if (err)
		    {
		        console.error('Error: ' + err.message);
		        return;
		    }
		 
		    console.log('Finished!');
		    res.status(201).json(result);
		});
                                
                    });
            });

		}
		else
		{
			res.status(201).json(result);
		}
	}
});
}
},
tokenname:function(req,res)
{
console.log(req.body.token);
var prev="null";

token.findOne({macAddress:req.body.address},function(err,user)
{
	if(!err)
	{
		if(user)
		prev=user.userToken;
		token.update({macAddress:req.body.address},{$set:{macAddress:req.body.address,userToken:req.body.token,user:req.body.name}},{upsert:true ,multi:true},function()
			{
			console.log('Token updated Successfully');
			});

		if(!(prev==="null"))
		{
			querydb.update({token:prev}, {
                            $set: {
                             token: req.body.token,
                            }
                        }, {
                             upsert: true,
                            multi: true
                            }, function() {
                                
                    });
		}
	}
});
},
create:function(req,res)           // for creating a new group
{
if(req.body.group && req.body.token)
{
var answer="null";

notify.find({groupName:req.body.group},function(err,user)
{
	if (err)
		throw err;
	if(user)
  answer=user.groupName;

      if(answer==="null")
{
    var API_KEY='key=AIzaSyDWaNecbKKuLP9ndQDMMYPLLrtawaN0Fxk';
   	var SENDER_ID='178770510313';

   	var json={operation: "create",
             notification_key_name: req.body.group,
             registration_ids:[req.body.token]
             };

    var formData=JSON.stringify(json);

    request({
    	headers:{
		    	'Content-Type':'application/json',
				'Authorization':API_KEY,
				'project_id':SENDER_ID
			},
			uri:'https://android.googleapis.com/gcm/notification',
			body:formData,
			method:'POST',
		    },
	function (error, response, body){
     console.log(body);
    var read_key=JSON.parse(body);
    if(read_key.hasOwnProperty('notification_key')){

    	console.log('Result succesfull');
    	var newKey= read_key['notification_key'];
 notify.update({groupName:req.body.group},{$set:{groupName:req.body.group,notificationKey:newKey}},{upsert:true,multi:true},function()
{
	console.log('Notification updated');
	centraldb.update({notificationKey:newKey,token:req.body.token},{$set:{valueAmount:0,notificationKey:newKey,token:req.body.token}},{upsert:true,multi:true},function()
	{
		console.log('Central database updated');
		res.status(201).json(read_key);
	});
	
});

			}
			else
			{
				
				res.json({notification_key:"null"});
			}
    //res.json(JSON.parse(body));
}
		    );

   
}
else
{
	res.json({notification_key:"null"});
}


});


}

}
,
joinGroup:function(req,res)               // to join an existing group
{
if(req.body.group && req.body.token)
{
	var answer="null";
	var key_notification;
	var search = req.body.group;
	var init_token=req.body.token;

	console.log('Before Search '+search);

	notify.findOne({groupName:search},function(err,user)
	{
		console.log(user);
		answer=user.groupName;
	    console.log(user.groupName)
		console.log(user.notificationKey)
		key_notification=user.notificationKey;

		console.log('Notification key  '+key_notification);

		if(answer==="null")
	{
		console.log('Early Return');
		res.json({notification_key:"null"});
	}
	else
	{
	var API_KEY='key=AIzaSyDWaNecbKKuLP9ndQDMMYPLLrtawaN0Fxk';
   	var SENDER_ID='178770510313';

   	var json={operation: "add",
             notification_key_name: req.body.group,
             notification_key:key_notification,
             registration_ids:[req.body.token]
             };

    var formData=JSON.stringify(json);

    request({
    	headers:{
		    	'Content-Type':'application/json',
				'Authorization':API_KEY,
				'project_id':SENDER_ID
			},
			uri:'https://android.googleapis.com/gcm/notification',
			body:formData,
			method:'POST',
		    },
		function (error, response, body){

	     console.log(body);
	    var read_key=JSON.parse(body);
	    if(read_key.hasOwnProperty('notification_key')){
	    	var newKey= read_key['notification_key'];
	    	centraldb.update({notificationKey:newKey,token:init_token},{$set:{valueAmount:0,notificationKey:newKey,token:init_token}},{upsert:true,multi:true},function()
	{
		console.log('Result succesfull');
	    	res.status(201).json(read_key);
	});
	    	
				}
				else
				{
					console.log('Result not succesfull');
					res.json({notification_key:"null"});
				}
	   
	}
		    );
	}
	});
}
}
};