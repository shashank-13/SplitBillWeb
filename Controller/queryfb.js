var centraldb=require('../database/centraldb.js');
var notify=require('../database/notification.js');  // All requirements ..
var asyncLoop = require('node-async-loop');

module.exports={
index:function(req,res)
{

	var data=req.body;

	console.log(data);

	var token=req.headers['x-access-token'];  // user token 

	if(data && token)
	{
		var result=[];

	asyncLoop(data,function(item,next)    // looping through each group
	{
		var total_score,my_score,net_Score;
		total_score=my_score=net_Score=0;
		var groupName;


		notify.findOne({notificationKey:item['key']},function(err,user)
		{
			groupName=user.groupName;

			centraldb.find({notificationKey:item['key']},function(err,users)
		{
	 		users.forEach(function(user)
	      {
	      	 if(user.token===token)
	        	my_score+=user.valueAmount;

	        total_score+=Math.abs(user.valueAmount);
	     
	      });
	 		
			var temp={total:total_score,current:my_score,group:groupName};
			result.push(temp);
			
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

//esXv8Mgk7Fo:APA91bFlEIJokGluWIVkHZwvBl75Cv0LxUGouxSv2x1g3hBZ6_mSFZwvr3fq4xjN8YNgv7KKG7bdUusmEkxVDF_eAF6XHBDAizlBXQT0N0yMxLzwgdeLW-UiEgoK91mwy6KM2SNgrpHJ

//esXv8Mgk7Fo:APA91bFlEIJokGluWIVkHZwvBl75Cv0LxUGouxSv2x1g3hBZ6_mSFZwvr3fq4xjN8YNgv7KKG7bdUusmEkxVDF_eAF6XHBDAizlBXQT0N0yMxLzwgdeLW-UiEgoK91mwy6KM2SNgrpHJ