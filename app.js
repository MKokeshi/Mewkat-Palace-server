var express = require('express');
const bodyParser= require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {

});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
