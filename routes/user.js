const express = require('express');
const router = express.Router();
const userController = require('../controllers/userCrtr');
const getUser = require('../controllers/user/getUser');


router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

router.route('/get').get(getUser.show);

module.exports = router;