var querydb = require('../database/centraldb.js');
var admin = require('firebase-admin');
var token=require('../database/token.js');
var notify=require('../database/notification.js');
var asyncLoop = require('node-async-loop');
var namedb=require('../database/username.js');


module.exports = {


    index:function(req,res)
    {
        var data=req.body;
        var notification=req.headers['key'];
        var message=req.headers['message'];
        console.log(data);
        console.log(notification);
        console.log(message);

        if(data && notification)
        {
            asyncLoop(data,function(item,next)
            {

            namedb.findOne({userName:item['key']},function(err,user)
            {
                if(err)
                    throw err;
                var userid = user.userid;
                querydb.findOne({notificationKey:notification,userid:userid},function(err,user)
                {
                    if(!err)
                    {

                        var prev=0;
                        if(user)
                            prev=user.valueAmount;
                        var new_amount = item['value']+prev;
                        querydb.update({notificationKey:notification,userid:userid}, {
                            $set: {
                             notificationKey: notification,
                             userid:userid,
                             valueAmount: new_amount
                            }
                        }, {
                             upsert: true,
                            multi: true
                             }, function() {
                                next();
                             });

                    }

                });
            });
            },function(err)
            {
                if (err)
                {
                    console.error('Error: ' + err.message);
                    return;
                }

                var payLoad={notification:{title:"Group Expense",body:message}};
                admin.messaging().sendToDevice(notification,payLoad).then(function(response)

                {
                    console.log("Successfully message ",response);
                })
                .catch(function(error)
                {
                 console.log('Error Sending message'+error);
                });
            console.log('Finished!');
            res.status(201).json( [{message : 'Successfully done'}]);

            });
        }
        else
        {
            res.status(201).json([{message:'null'}]);
        }

    }
};
