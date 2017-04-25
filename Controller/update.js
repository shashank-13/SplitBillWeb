var token=require('../database/token.js');
var notify=require('../database/notification.js');
var request=require('request');
var querydb = require('../database/centraldb.js');

module.exports={
token:function(req,res)          // For updating the registration token
{
if(req.body.address && req.body.token && req.body.name)
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
}
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
	res.status(201).json(read_key);
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
	    	console.log('Result succesfull');
	    	res.status(201).json(read_key);
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