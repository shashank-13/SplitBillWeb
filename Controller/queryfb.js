var centraldb=require('../database/centraldb.js');
var notify=require('../database/notification.js');  // All requirements ..
var asyncLoop = require('node-async-loop');

module.exports={
index:function(req,res)
{

	var data=req.body;

	var token=req.headers['x-access-token'];  // user token 

	if(data && token)
	{
		var result=[];

	asyncLoop(data,function(item,next)    // looping through each group
	{
		var total_score,my_score,net_Score,count_obj;
		total_score=my_score=net_Score=count_obj=0;
		var groupName;


		notify.findOne({notificationKey:item['key']},function(err,user)
		{
			groupName=user.groupName;

			centraldb.find({notificationKey:item['key']},function(err,users)
		{
	 		users.forEach(function(user)
	      {

	        total_score+=user.valueAmount;
	        if(user.token===token)
	        	my_score+=user.valueAmount;
	        count_obj++;
	      });
	 		if(count_obj==0)
		{
			var temp={total:total_score,current:my_score,net:net_Score,group:groupName};
			result.push(temp);
		}


		else
		{
			net_Score=(my_score-(total_score/count_obj));
			var temp={total:total_score,current:my_score,net:net_Score,group:groupName};
			result.push(temp);
		}
	 		next();
		});
		});
		

	/*	*/
	}, function (err)
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
		res.status(400).json('Bad parameters');
	}
}
};