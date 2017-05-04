var express = require('express');
var admin = require('firebase-admin');
var bodyParser=require('body-parser');
var routes=require('./router');
var mongoose=require('mongoose');

var serviceAccount = require("../data/keystore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://splitbill-455c8.firebaseio.com/"
});

mongoose.connect('mongodb://shashank13_:QwertyU13@ds029381.mlab.com:29381/moneydb');
mongoose.connection.on('open', function() { console.log('Mongoose connected.'); });

module.exports = function(app)
{
app.use(bodyParser.urlencoded({
        'extended': true
    }));
    app.use(bodyParser.json());
    routes(app);
   return app;
};