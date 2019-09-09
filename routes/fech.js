const express = require('express');

const getCatCtrl = require('../controllers/categories/getCatCtrl');
const getChanelsCtrl = require('../controllers/chanels/getChanelsCtrl');
const getOrgansCtrl = require('../controllers/organs/getOrgansCtrl');

var router = express.Router(); 

router.route('/cetegories').get(getCatCtrl.show);
router.route('/chanel').get(getChanelsCtrl.show);
router.route('/organizations').get(getOrgansCtrl.show);

module.exports = router;