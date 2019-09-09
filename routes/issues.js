const express = require('express');

const issuesCtrl = require('../controllers/issues/addIssuesCtrl');
const getIssuetCtrl = require('../controllers/getIssueCtrl');
const updateIssueCtrl = require('../controllers/issues/updateIssueCtrl');
const delIssue = require('../controllers/issues/delIssue')


var router = express.Router(); 

router.route('/user/:createdById').get(updateIssueCtrl.getIdByUser);
router.route('/').post(issuesCtrl.create).get(getIssuetCtrl.show);
router.route('/:issueId').put(updateIssueCtrl.update).get(updateIssueCtrl.getId).delete(delIssue.del);

module.exports = router;