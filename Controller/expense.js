var token=require('../database/token.js');
var notify=require('../database/notification.js');
var centraldb=require('../database/centraldb.js');
var asyncLoop = require('node-async-loop');
var namedb=require('../database/username.js');

module.exports={
index:function (req,res) {
	// body...
var result= new Array();
	var token_name=req.headers['x-access-token']; 
	var notification=req.body;

	if(notification && token_name)
	{
		asyncLoop(notification,function(item,next)
		{
			console.log(item);
			centraldb.find({notificationKey:item['key']},function(err,users)
			{
				var list_array= new Array();
				asyncLoop(users,function(item1,next1)
				{
					namedb.findOne({userid:item1.userid},function(err,user)
					{
						list_array.push(user.userName);
						next1();
					});
				},
				function(err)
				{
					if (err)
				    {
				        console.error('Error: ' + err.message);
				        return;
				    }
				    result.push({"group":item['group'],"list_name":list_array});
				    console.log(result);
				    next();
				});
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
		}
		);

	}
	else
	{
		res.json(result);
	}

}
};