 var token=require('../database/token.js');
var notify=require('../database/notification.js');
var request=require('request');
var querydb = require('../database/centraldb.js');
var centraldb=require('../database/centraldb.js');
var asyncLoop = require('node-async-loop');
var admin = require('firebase-admin');
var namedb=require('../database/username.js');
var serverKey=require('../data/serverkey.js');

var result=[];

function makeRequests(new_Token,notificationKey,groupName,next)
{
	var API_KEY=serverKey.apikey;
	var SENDER_ID=serverKey.SENDER_ID;

	var json={operation: "add",
         notification_key_name: groupName,
					 notification_key:notificationKey,
					 registration_ids:[new_Token]
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
				centraldb.update({notificationKey:notificationKey},{$set:{notificationKey:newKey}},{upsert:true,multi:true},function()
	{
		notify.update({notificationKey:notificationKey},{$set:{notificationKey:newKey}},{upsert:true,multi:true},function()
		{
			notify.findOne({notificationKey:newKey},function(err,user)
			{
				result.push({groupName:user.groupName,notificationKey:user.notificationKey});
				next();
			});
		});
			
	});

				}
				else
				{
					console.log('Result not succesfull');
					next();
					
				}

	}
				);
}
module.exports={
token:function(req,res)          // For updating the registration token
{
	var global_data=req.body;
	var global_id,global_token;
	asyncLoop(global_data,function(item,next)
	{
		global_id=item['userid'];
		global_token=item['token'];
		next();
		},function(err)
		{
			if (err)
		    {
		        console.error('Error: ' + err.message);
		        return;
		    }
		  });
	console.log(global_id);

	console.log(global_token);

	if(global_id && global_token)
{
	console.log(global_token);

	token.update({userid:global_id},{$set:{userid:global_id,userToken:global_token}},{upsert:true ,multi:true},function()
		{
		console.log('Token updated Successfully');
		});
		
			querydb.find({userid:global_id},function(err,users)
		{
			asyncLoop(users,function(item,next)
		{
			if(item){
				var old_notification=item.notificationKey;
			notify.findOne({notificationKey:old_notification},function(err,user)
			{
				makeRequests(global_token,old_notification,user.groupName,next);
			});
			}
			else
			{
				next();
			}
			

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

}

		else
		{
			res.status(201).json(result);
		}

},

avatar:function(req,res)
{
	if(req.body.userid)
	{
		namedb.findOne({userid:req.body.userid},function(err,user)
		{
			if(user)
			{
				res.status(201).json({message:user.userName});
			}
			else
			{
				res.status(201).json({message:''});
			}
		});
	}
	else
	{
		res.status(201).json({message:''});
	}

},
tokenname:function(req,res)
{
namedb.count({userName:req.body.name},function(err,c)
				{
					if(!err)
					{
						if(c==0)
					{
	namedb.update({userid:req.body.userid},{$set:{userid:req.body.userid,userName:req.body.name}},{upsert:true ,multi:true},function()
			{
			console.log('Name updated Successfully');
			res.status(201).json({message:'done'});
			});
					}
					else
					{

						res.status(201).json({message:'error'});

					}

					}
					else
					{
						res.status(201).json({message:'error'});
					}

				});
},
create:function(req,res)           // for creating a new group
{
if(req.body.group && req.body.token && req.body.userid && req.body.avatar)
{
var answer="";

notify.findOne({groupName:req.body.group},function(err,user)
{
	if (err)
		throw err;
	if(user)
  answer=user.groupName;
  console.log('answer = '+answer);

      if(answer==="")
{
    var API_KEY=serverKey.apikey;
   	var SENDER_ID=serverKey.SENDER_ID;

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
		console.log('Request loop entered')
     console.log(body);
    var read_key=JSON.parse(body);
    if(read_key.hasOwnProperty('notification_key')){

    	console.log('Result succesfull');
    	var newKey= read_key['notification_key'];
 notify.update({groupName:req.body.group,notificationKey:newKey},{$set:{groupName:req.body.group,notificationKey:newKey}},{upsert:true,multi:true},function()
{
	console.log('Notification updated');
	centraldb.update({notificationKey:newKey,userid:req.body.userid},{$set:{valueAmount:0,notificationKey:newKey,userid:req.body.userid}},{upsert:true,multi:true},function()
	{
		var message=req.body.avatar+" created the group "+req.body.group;
		var payLoad={notification:{title:"New Group",body:message}};
                admin.messaging().sendToDevice(newKey,payLoad).then(function(response)

                {
                    console.log("Successfully message ",response);
                })
                .catch(function(error)
                {
                 console.log('Error Sending message'+error);
                });
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
if(req.body.group && req.body.token && req.body.userid && req.body.avatar)
{
	var answer="";
	var key_notification="";
	var search = req.body.group;
	var init_token=req.body.token;

	console.log('Before Search '+search);

	notify.findOne({groupName:search},function(err,user)
	{
		console.log(user);
		if(user)
		{
		answer=user.groupName;
		key_notification=user.notificationKey;
	    }

		console.log('Notification key  '+key_notification);

		if(answer==="")
	{
		console.log('Early Return');
		res.json({notification_key:"null"});
	}
	else
	{
	var API_KEY=serverKey.apikey;
   	var SENDER_ID=serverKey.SENDER_ID;

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
	  notify.update({groupName:req.body.group,notificationKey:newKey},{$set:{groupName:req.body.group,notificationKey:newKey}},{upsert:true,multi:true},function()
{
	console.log('Notification updated');
	centraldb.update({notificationKey:newKey,userid:req.body.userid},{$set:{valueAmount:0,notificationKey:newKey,userid:req.body.userid}},{upsert:true,multi:true},function()
	{
		var message=req.body.avatar+" joined the group "+req.body.group;
		var payLoad={notification:{title:"Joined Group",body:message}};
                admin.messaging().sendToDevice(newKey,payLoad).then(function(response)

                {
                    console.log("Successfully message ",response);
                })
                .catch(function(error)
                {
                 console.log('Error Sending message'+error);
                });
		console.log('Central database updated');
		res.status(201).json(read_key);
	});

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
