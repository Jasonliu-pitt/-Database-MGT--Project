var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var formidable = require("formidable");
fs = require("fs");
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// connect to MongoDB
mongoose.connect('mongodb://localhost/carttest')
.then(() =>  console.log('connection succesful'))
 .catch((err) => console.error(err));
 
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// all the path
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/userctrl', require('./routes/userctrl'));
app.use('/productctrl', require('./routes/productctrl'));
app.use('/cartctrl', require('./routes/cartctrl'));
app.use('/searchitems', require('./routes/search'));
app.use('/transaction', require('./routes/transaction'));
app.use('/administrator', require('./routes/administrator'));
app.use('/chart', require('./routes/chart'));

app.post('/upload/:length', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files) {
        fs.writeFileSync('public/images/img'+req.params.length+'.jpg', fs.readFileSync(files.upload.path));
    });
});

app.listen(4000,function(){
    console.log("It's Started on PORT 4000");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
