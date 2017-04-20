var express=require('express');
var router=express.Router();

var home = require('../Controller/home');
var update=require('../Controller/update');
var querydb=require('../Controller/queryfb');
var updatedb=require('../Controller/updatedb');


module.exports=function(app)
{
router.get('/test',home.test);
router.get('/testtoken',home.test1);
router.get('/testnotify',home.test2);
router.get('/deletedata',home.deletedata);
router.get('/inserttoken',home.inserttoken);
router.get('/insertgroup',home.insertgroup);
router.get('/insertvalue',home.insertvalue);
router.get('/send',home.index);
router.post('/createGroup',update.create);
router.post('/updateToken',update.token);
router.post('/joinGroup',update.joinGroup);
router.post('/updateVal',querydb.index);
router.get('/insert',home.insertManual);
router.post('/updatedb',updatedb.index);
app.use(router);
};
