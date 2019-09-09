const Organs = require('../../models/organsModel')
const _ = require("lodash");


exports.create = function(req, res, next) {
  var organs = new Organs();    

  organs.name = req.body.name;
  
  organs.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Issue created!' });
  });

};

