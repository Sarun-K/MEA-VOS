const express = require('express');
const getTestCtrl = require('../controllers/getTestCtrl');


var router = express.Router(); 

router.route('/').get(getTestCtrl.show);

module.exports = router;