var token=require('../database/token.js');
var notify=require('../database/notification.js');
var centraldb=require('../database/centraldb.js');
var asyncLoop = require('node-async-loop');
var admin = require('firebase-admin');
var request=require('request');
var namedb=require('../database/username.js');
var serverKey=require('../data/serverkey.js');


module.exports={
index : function(req,res)
{
	var data=req.body;
	var global_group;
	data.forEach(function(entry)
	{
		global_group=entry['group'];
	});
	if(global_group)
	{
		var result= new Array();
		notify.findOne({groupName:global_group},function(err,user)
		{
			if(user)
			{
			centraldb.find({notificationKey:user.notificationKey},function(err,users)
			{
				asyncLoop(users,function(item,next)
				{
					var amount_val=0;
					if(item.valueAmount >0 || item.valueAmount <0){
						amount_val=item.valueAmount;
					namedb.findOne({userid:item.userid},function(err,user)
					{
						result.push({groupName:user.userName,amount:amount_val});
						next();
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
		});
	}
},
clear:function(req,res)
{
	var data=req.body.key;
	var user_name=req.body.name;
	if(data && user_name)
	{

	centraldb.update({notificationKey:data},{$set:{valueAmount:0}},{upsert:true,multi:true},function()
	{
		var message=user_name+" just cleared the Dependencies in the group";
		var payLoad={notification:{title:"Dependencies",body:message}};
                admin.messaging().sendToDevice(data,payLoad).then(function(response)

                {
                    console.log("Successfully message ",response);
                })
                .catch(function(error)
                {
                 console.log('Error Sending message'+error);
                });
		res.status(201).json({message:'done'});
	});

	}
			
},
leave:function(req,res)
{
	var data=req.body.key;
	var user_name=req.body.name;
	var token=req.headers['x-access-token'];
	var userid=req.body.userid;

	if(data && user_name && token)
	{
		centraldb.remove({notificationKey:data,userid:userid},function(err)
		{
			if(!err)
			{
				console.log(user_name+" removed");
				centraldb.count({notificationKey:data},function(err,c)
				{
					if(!err)
					{
						if(c==0)
					{
						notify.remove({notificationKey:data},function(err)
						{
							if(!err)
							{
								console.log('group deleted');
								makeRequests(data,token,0,user_name,res);
							}
						});
					}
					else
					{
						makeRequests(data,token,1,user_name,res);
					
					}

					}
					
				});
			}
		});
	}
}
};

function makeRequests(data,token,flag,user_name,res)
{
	console.log('Make reqs entered');

	var API_KEY=serverKey.apikey;
   	var SENDER_ID=serverKey.SENDER_ID;

   	var json={operation: "remove",
             notification_key:data,
             registration_ids:[token]
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
			console.log(response);
			if(flag==1)
			{
				var message=user_name+' left the group';
				var payLoad={notification:{title:"Group Left!!",body:message}};
                admin.messaging().sendToDevice(data,payLoad).then(function(response)

                {
                    console.log("Successfully message ",response);
                })
                .catch(function(error)
                {
                 console.log('Error Sending message'+error);
                });
                 res.status(201).json( {message : 'Successfully done'});
			}

			else
			{
				 res.status(201).json( {message : 'Successfully done'});
			}
 
	}
		    );
}