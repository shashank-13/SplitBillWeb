var querydb=require('../database/centraldb.js');

module.exports={
index:function(req,res)
{
	var token_val =req.headers['x-access-token'];
	querydb.find({notificationKey : req.body.key ,token:token_val },function(err,user)
	{

		if(err)
			throw err;
		var newSchema=querydb({notificationKey:req.body.key,valueAmount:req.body.amount,
			token:token_val});

		newSchema.save(function(err,record)
		{
			if(err)
				throw err;
			console.log('Database updated successfully');
			console.log(record.notificationKey);
			console.log(record.valueAmount);
			console.log(record.token);
		});
	});
}
};