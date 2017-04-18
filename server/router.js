var express=require('express');
var router=express.Router();

var home = require('../Controller/home');
var update=require('../Controller/update');
var querydb=require('../Controller/queryfb');


module.exports=function(app)
{
router.get('/test',home.test);
router.get('/send',home.index);
router.post('/createGroup',update.create);
router.post('/updateToken',update.token);
router.post('/joinGroup',update.joinGroup);
router.post('/getNotificationKey',querydb.index);
router.get('/insert',home.insertManual);
app.use(router);
};
