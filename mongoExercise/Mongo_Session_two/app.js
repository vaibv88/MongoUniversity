var express = require('express');
var app = express();
var cons = require('consolidate');
var swig = require('swig');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


app.engine('html', swig.renderFile);
app.set('view engine','html');
app.set('views',__dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db){
  assert.equal(null, err);
  console.log('Successfully Connected to mongodb');

  app.get('/', function(req, res){
    db.collection('video').find({"title"}).toArray(function(err, docs){
      res.render('video',{'video':docs});
    });
  });

  app.use(function(req, res){
    console.log('404 not found');
  });

  var port = Number(process.env.PORT || 3000)
  var server = app.listen(port, function(){

    console.log('server is listening at %s', +port);
  });
});
