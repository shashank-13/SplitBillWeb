var token=require('../database/token.js');
var notify=require('../database/notification.js');
var centraldb=require('../database/centraldb.js');
var asyncLoop = require('node-async-loop');

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
					token.findOne({userToken:item.token},function(err,user)
					{
						result.push({groupName:user.user,amount:amount_val});
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
}
};