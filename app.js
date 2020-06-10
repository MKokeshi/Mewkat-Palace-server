var express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongoConnectionString = process.env.MONGO_CONNECTION;

var app = express();

//Mongo connection
MongoClient.connect(mongoConnectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })



app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {

});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
