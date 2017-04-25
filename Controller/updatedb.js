var querydb = require('../database/centraldb.js');
var admin = require('firebase-admin');
var token=require('../database/token.js');
var notify=require('../database/notification.js');
var asyncLoop = require('node-async-loop');


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

            token.findOne({user:item['key']},function(err,user)
            {
                if(err)
                    throw err;
                var tokenVal = user.userToken;
                querydb.findOne({notificationKey:notification,token:tokenVal},function(err,user)
                {
                    if(!err)
                    {
                        var prev=user.valueAmount;
                        var new_amount = item['value']+prev;
                        querydb.update({notificationKey:notification,token:tokenVal}, {
                            $set: {
                             notificationKey: notification,
                             token: tokenVal,
                             valueAmount: new_amount
                            }
                        }, {
                             upsert: true,
                            multi: true
                             }, function() {
                                next();
                             });

                    }
                    else
                    {
                        querydb.update({notificationKey:notification,token:tokenVal}, {
                            $set: {
                             notificationKey: notification,
                             token: tokenVal,
                             valueAmount: item['value']
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
            res.status(201).json( {message : 'Successfully done'});

            });
        }
        else
        {
            res.status(201).json({message:'null'});
        }

    }
};
