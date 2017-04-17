var express=require('express');
var config=require('./server/config');


app=express();
app=config(app);
app.set('port',process.env.PORT || 3500);


app.listen(app.get('port'), function() {
console.log('Server up: http://localhost:' + app.get('port'));
});