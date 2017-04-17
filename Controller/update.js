var token=require('../database/token.js');
module.exports={
	token:function(req,res)
	{
		if(req.body.address && req.body.token)
		{
			var newToken = new token({macAddress:req.body.address,
				userToken:req.body.token
			});
			newToken.update({upsert : true},function(err,record)
      {
        if(err)
        throw err;
          res.status(201).json({message : "Token updated succesfully"});
      });

		}
	}
};