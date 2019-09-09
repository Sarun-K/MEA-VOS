const express = require('express');
const updateUserCtrl = require('../controllers/user/updateUserCtrl');
const getUser = require('../controllers/user/getUser');
const delUser = require('../controllers/user/delUser');
const userController = require('../controllers/userCrtr');

var router = express.Router(); 

router.route('/:userId').put(updateUserCtrl.update).get(updateUserCtrl.getId).delete(delUser.del);
router.route('/').get(getUser.show);



module.exports = router;