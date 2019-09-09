const Categorise = require('../../models/catModel')
const _ = require("lodash");


exports.create = function(req, res, next) {
  var categories = new Categorise();    

  categories.name = req.body.name;
  
  categories.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Issue created!' });
  });

};

