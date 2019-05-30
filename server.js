const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const courses = require('./routes/courses') ;
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const cors = require('cors');
var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', 'qwerty'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));

/* route requests for static files to appropriate directory */
app.use(express.static('front'));

// public route
app.use('/api/users', users);
app.use('/api/courses', courses);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something looks wrong!"});

});

app.listen(3000, function(){
	console.log('Node server listening on port 3000');
});
