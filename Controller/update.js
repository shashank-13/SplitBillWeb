var token=require('../database/token.js');
var key=require('../database/notification.js');
var request=require('request');

module.exports={
token:function(req,res)
{
if(req.body.address && req.body.token)
{
	var newToken = new token({macAddress:req.body.address,
		userToken:req.body.token
	});
	newToken.save(function(err,record)
{
if(err)
throw err;
console.log('database updated succesfully');
  res.status(201).json({message : "Token updated succesfully"});
});

}
},

create:function(req,res)
{
if(req.body.group && req.body.token)
{
	var answer="null";

	key.find({groupName:req.body.group},function(err,user)
    {
    	if (err)
    		throw err;

      answer=user.groupName;
    });

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
	    	var newKey= key(groupName:req.body.group,notificationKey:read_key
	    		['notification_key']);
	    	newKey.save(function(err,record)
	    	{
	    		if err
	    			throw err;
	    		console.log('New Group Created succesfully');
	    		res.status(201).json(read_key);
	    	});

				}
	    res.json(JSON.parse(body));
	}
			    );

	   
}
    }
    else
    {
    	res.json({notification_key:"null"});
    }
},
update:function(req,res)
{
	if(req.body.group && req.body.token)
	{
		var answer="null";
		key.find(groupName:req.body.group,function(err,user)
		{
			answer=user.groupName;
		});

		if(answer==="null")
		{
			res.json({notification_key:"null"});
		}
		else
		{
		var API_KEY='key=AIzaSyDWaNecbKKuLP9ndQDMMYPLLrtawaN0Fxk';
	   	var SENDER_ID='178770510313';

	   	var json={operation: "add",
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
	    	
	    		res.status(201).json(read_key);
	   

				}
	    res.json(JSON.parse(body));
	}
			    );
		}
	}
}
};