const mongoURI = 'mongodb://localhost:27017/MEA_db';
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
const logger = require('morgan');
var jwt = require('jsonwebtoken');
const auth=require('./middleware/auth');
var cors = require('cors');

const conn = mongoose.createConnection(mongoURI);
mongoose.connect(mongoURI);
app.use(cors());
/*
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
*/

app.set('secretKey', 'nodeRestApi'); // jwt secret token

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb'  }));
app.use(bodyParser.json({ limit: '10mb' }));

const port = process.env.PORT || 5000;

var router = express.Router();    


/// allow cross-origin

router.all('/', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requestes-With");
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);


////////////////////////////////////////////////////////////////////////
// other api
////////////////////////////////////////////////////////////////////////


// private routes
router.use('/issues', require('./routes/issues'));
router.use('/get/issues', require('./routes/issues'));

// public routes
////////////////////////////

router.use('/users', require('./routes/user')); // register and authen
router.use('/fech', require('./routes/fech'));

////////////////////////////


//user route
////////////////////////////

router.use('/auth/users',auth, require('./routes/auth'));
router.use('/user/issues',auth, require('./routes/issues'));
router.use('/user/edit', require('./routes/admin'));

// Admin routes
////////////////////////////

router.use('/admin/users',auth, require('./routes/admin'));
router.use('/admin/issues',auth, require('./routes/issues'));
router.use('/categories',auth, require('./routes/categories'));
router.use('/chanels',auth, require('./routes/chanels'));
router.use('/organizations',auth, require('./routes/organs'));

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////





// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

