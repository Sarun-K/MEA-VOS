const express = require('express');

const addChanelsCtrl = require('../controllers/chanels/addChanelsCtrl');
const getChanelsCtrl = require('../controllers/chanels/getChanelsCtrl');
const getIdChanelsCtrl = require('../controllers/chanels/getIdChanelsCtrl');
const updateChanelCtrl = require('../controllers/chanels/updateChanelCtrl')
const delChanelCtrl = require('../controllers/chanels/delChanelCtrl')


var router = express.Router(); 

router.route('/').post(addChanelsCtrl.create).get(getChanelsCtrl.show);
router.route('/:chanelId').get(getIdChanelsCtrl.getId).put(updateChanelCtrl.update).delete(delChanelCtrl.del);

module.exports = router;