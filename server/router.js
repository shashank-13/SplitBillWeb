var express=require('express');
var router=express.Router();

var home = require('../Controller/home');
var update=require('../Controller/update');
var querydb=require('../Controller/queryfb');
var updatedb=require('../Controller/updatedb');
var expensedb=require('../Controller/expense');
var depend=require('../Controller/dependency');


module.exports=function(app)
{
router.get('/test',home.test);
router.get('/testtoken',home.test1);
router.get('/testnotify',home.test2);
router.get('/deletedata',home.deletedata);
router.get('/inserttoken',home.inserttoken);       // For testing purposes 
router.get('/insertgroup',home.insertgroup);
router.get('/insertvalue',home.insertvalue);
router.get('/send',home.index);
router.get('/insert',home.insertManual);

router.post('/createGroup',update.create);
router.post('/updateToken',update.token);        // For Token and group formation
router.post('/joinGroup',update.joinGroup);

router.post('/updateVal',querydb.index);

router.post('/queryexpense',expensedb.index);

router.post('/dependency',depend.index);



router.post('/updatedb',updatedb.index);           // For updating expenses
app.use(router);
};
