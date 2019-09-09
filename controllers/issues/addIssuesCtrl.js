const Issues = require('../../models/issuesModel')



exports.create = function(req, res, next) {
  var issues = new Issues();      
  
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
  issues.createdBy = req.body.createdBy;
  issues.createdById = req.body.createdById;
  

  issues.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Issue created!' });
  });

};

