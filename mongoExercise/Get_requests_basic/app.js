var express = require('express');
var con = require('consolidate');
var swig = require('swig');
var app = express();

app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',__dirname + '/views');

//app.use(app.router);

function errorHandler(err,req,res,next) {
  console.error(err.message);
  console.log(err.stack);
  res.status(500);
  res.render('error-template',{error : err});
}

app.get('/:name', function(req,res){

  var name = req.params.name;
  var getvar1 = req.query.getvar1;
  var getvar2 = req.query.getvar2;
  res.render('view',{name: name, getvar1 : getvar1, getvar2:getvar2});

});

var port = Number(process.env.PORT || 3000);

app.listen(3010); 
