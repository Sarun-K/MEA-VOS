const express = require('express');
const updateUserCtrl = require('../controllers/user/updateUserCtrl')



var router = express.Router(); 

router.route('/:userId').put(updateUserCtrl.update).get(updateUserCtrl.getId);

module.exports = router;