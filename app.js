/*const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
//const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// The view engine I use throughout the site.
var exphbs = require('express-handlebars');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

require('dotenv').config();



const mLab = 'mongodb://' + process.env.dbUSER + ':' + process.env.dbPASS + process.env.dbHOST + '/' + process.env.dbNAME + '?authMode=scram-sha1'; 
mongoose.connect(mLab);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/public', express.static(process.cwd() + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set( 'port', ( process.env.PORT || 5000 ));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/controllers', express.static(process.cwd() + '/controllers'));

app.listen( app.get( 'port' ), function () {
    console.log('Node js Express js Tutorial at port',  app.get( 'port' ));
});
*/const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
//const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// The view engine I use throughout the site.
var exphbs = require('express-handlebars');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

require('dotenv').config();


const mLab = 'mongodb://' + process.env.dbUSER + ':' + process.env.dbPASS + process.env.dbHOST + '/' + process.env.dbNAME + '?authMode=scram-sha1'; 

mongoose.connect(mLab);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/public', express.static(process.cwd() + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set( 'port', ( process.env.PORT || 5000 ));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/controllers', express.static(process.cwd() + '/controllers'));

app.listen( app.get( 'port' ), function () {
    console.log('Node js Express js Tutorial at port',  app.get( 'port' ));
});