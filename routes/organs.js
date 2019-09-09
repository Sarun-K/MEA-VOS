const express = require('express');

const addOrgansCtrl = require('../controllers/organs/addOrgansCtrl');
const getOrgansCtrl = require('../controllers/organs/getOrgansCtrl');
const getIdOrgansCtrl = require('../controllers/organs/getIdOrgansCtrl');
const updateOrgansCtrl = require('../controllers/organs/updateOrgansCtrl');
const delOrgansCtrl = require('../controllers/organs/delOrgansCtrl');

var router = express.Router(); 

router.route('/').post(addOrgansCtrl.create).get(getOrgansCtrl.show);
router.route('/:organId').get(getIdOrgansCtrl.getId).put(updateOrgansCtrl.update).delete(delOrgansCtrl.del);

module.exports = router;