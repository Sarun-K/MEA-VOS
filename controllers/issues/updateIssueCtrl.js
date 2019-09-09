const Issues = require('../../models/issuesModel')


exports.update = function(req, res) {

  // use our bear model to find the bear we want
  Issues.findById(req.params.issueId, function(err, issues) {

      if (err)
          res.send(err);

          issues.title = req.body.title;  
    issues.issueType = req.body.issueType;
    issues.chanel = req.body.chanel;
    issues.description = req.body.description;
    issues.complaneDate = req.body.complaneDate;
    issues.organization = req.body.organization;
    issues.customer.firstname = req.body.firstname;
    issues.customer.lastname = req.body.lastname;
    issues.customer.address = req.body.address;
    issues.customer.phone = req.body.phone;
    issues.customer.email = req.body.email;
    issues.file = req.body.file;
    issues.status = req.body.status;
    issues.createdBy = req.body.createdBy;  // update the bears info

      // save the bear
      issues.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'Bear updated!' });
      });

  });
}

exports.getId = function(req, res) {
    Issues.findById(req.params.issueId, function(err, issues) {
  if (err)
      res.send(err);
  res.json(issues);
});
};

exports.getIdByUser = function(req, res) {
  Issues.find({'createdById':req.params.createdById}, function(err, issues) {

if (err)
    res.send(err);
res.json(issues);
});
};

