var admin = require('firebase-admin');
var token=require('../database/token.js');

module.exports={
index:function(req,res)
{
	var registrationToken1='ca3NttSDxo8:APA91bG_PV-_gioR0-ZZkGgIVKhTdfwkKcxSqIWPbU9v4I8OrhVm7cR4dUNO6X96gHqAaTxSafRR5HWhh1rHQ3UAruL0sHcGNHvUVLuuDqA1LyxzOiLzXKlvgpBC5i0kL8onlM6BI4BL';
	var registrationToken2='ez5swNhkmTg:APA91bFB1ZkB8y6xN238YwdfXNNFKF0bpVnj_sKZ15vmCcQ7o7sa5z_RN2nEVhsmB4VpvQmZ5WHdLO6pxkTNwYcVcMBdodNkPcuTw_oa1qYzWDuVm3rMuHhV1FuWsua0WmxGsdD0iIyY';
    
    var notificationKey = "APA91bHX7syhgU7nHZJyILWs0H-mPCbI7Zo3OT2WE57e5P-gCJAVK7WCkXCxDnYZGQbm3m4iurwjlZwjWCgWo3y8OpvsZGfwKjVvCCj3nxQ2ld_mVGEkmmQ";

	var registrationToken =[registrationToken1,registrationToken2];

	var payLoad={notification:{title:"Notifications..",message:"Hello from nodejs"}};

	admin.messaging().sendToDevice(notificationKey,payLoad).then(function(response)

	{
		console.log("Successfully message ",response);
	})
	.catch(function(error)
	{
     console.log('Error Sending message'+error);
	});

res.send('Message Deliverd')
},
test:function(req,res)
{
    token.find({macAddress :'fuckAll'},function(err,users)
    {
      users.forEach(function(user)
      {
        console.log(user.macAddress);
        console.log(user.userToken);
      });
    });
	res.send('Database Test Completed');
}
};