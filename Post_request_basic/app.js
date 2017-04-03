var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var swig = require('swig');

app.engine('html',swig.renderFile);
app.set('view engine',"html")
app.set('views',__dirname +'/views');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(errorHandler);

function errorHandler(err, req, res, next){
  console.error(err.message);
  console.error(err.stack);
  res.status(500);
  res.render('err_template',{err:error});

}

app.get('/', function(req, res, next){
  res.render('fav_fruit',{ 'fruits' : ['apple','orange','banana','peach','mango']});
});


app.post('/fav_fruit', function(req, res, next){
  var favourite = req.body.fruit;
  if(typeof favourite== 'undefined' ){
    next(Error('Please select the fruit'));
  }
  else {
    res.send('Your favourite fruit is:'+favourite);
  }
});

var port = Number(process.env.PORT || 3000);
app.listen(port, function(){
  console.log('Server is started at ',+port);
});
