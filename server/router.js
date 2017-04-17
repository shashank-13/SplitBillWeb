var express=require('express');
var router=express.Router();
var home = require('../Controller/home');
var update=require('../Controller/update');
module.exports=function(app)
{
router.get('/test',home.index);
router.post('/updateToken',update.token)
app.use(router);
};
