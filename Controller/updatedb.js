var querydb = require('../database/centraldb.js');
var admin = require('firebase-admin');

module.exports = {
    index: function(req, res) {
        if (req.body.key && req.body.amount && req.body.message) {
            var token_val = req.headers['x-access-token'];

            querydb.update({
                notificationKey: req.body.key,
                token: token_val
            }, {
                $set: {
                    notificationKey: req.body.key,
                    token: token_val,
                    valueAmount: req.body.amount
                }
            }, {
                upsert: true,
                multi: true
            }, function() {
                querydb.findOne({
                    notificationKey: req.body.key,
                    token: token_val
                }, function(err, user) {

                    if (err)
                        throw err;
                    if (user) {
                        console.log(user);
                        console.log(user.valueAmount);
                        console.log(req.body.amount);
                        if (user.valueAmount == req.body.amount) {
                            console.log('Should send correct value')
													var payLoad={notification:{title:"Group Expense",body:req.body.message}};
													admin.messaging().sendToDevice(req.body.key,payLoad).then(function(response)

													{
														console.log("Successfully message ",response);
													})
													.catch(function(error)
													{
												     console.log('Error Sending message'+error);
													});
                            res.status(201).json({message: 'success'});
                        } else {
                            console.log('User found but data did not matched');
                            res.json({
                                message: 'null'
                            });
                        }
                    } else {
                        console.log('user not found');
                        res.json({
                            message: 'null'
                        });
                    }


                });
            });

        } else {
            console.log('Error in data recieved from device');
            res.json({
                message: 'null'
            });
        }

    }
};
