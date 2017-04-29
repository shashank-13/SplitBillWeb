var centraldb=require('../database/centraldb.js');
var notify=require('../database/notification.js');  // All requirements ..
var asyncLoop = require('node-async-loop');
var token=require('../database/token.js');

module.exports={
index:function(req,res)
{

	var data=req.body;

	var userid="";

	console.log(data);

	var token1=req.headers['x-access-token']; 

	token.findOne({userToken:token1},function(err,user)
		{
			if(user)
			{
				userid=user.userid;
					if(data && token1)
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
		      	 if(user.userid===userid)
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
			});

	 // user token 

	
}
};

//esXv8Mgk7Fo:APA91bFlEIJokGluWIVkHZwvBl75Cv0LxUGouxSv2x1g3hBZ6_mSFZwvr3fq4xjN8YNgv7KKG7bdUusmEkxVDF_eAF6XHBDAizlBXQT0N0yMxLzwgdeLW-UiEgoK91mwy6KM2SNgrpHJ

//esXv8Mgk7Fo:APA91bFlEIJokGluWIVkHZwvBl75Cv0LxUGouxSv2x1g3hBZ6_mSFZwvr3fq4xjN8YNgv7KKG7bdUusmEkxVDF_eAF6XHBDAizlBXQT0N0yMxLzwgdeLW-UiEgoK91mwy6KM2SNgrpHJ