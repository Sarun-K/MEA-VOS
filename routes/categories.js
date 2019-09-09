const express = require('express');

const addCatCtrl = require('../controllers/categories/addCatCtrl');
const getCatCtrl = require('../controllers/categories/getCatCtrl');
const updateCatCtrl = require('../controllers/categories/updateCatCtrl')
const delCat = require('../controllers/categories/delCatCtrl')


var router = express.Router(); 

router.route('/').post(addCatCtrl.create).get(getCatCtrl.show);
router.route('/:catId').put(updateCatCtrl.update).get(updateCatCtrl.getId).delete(delCat.del);

module.exports = router;