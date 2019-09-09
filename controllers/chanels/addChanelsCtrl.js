const Chanels = require('../../models/chanelsModel')
const _ = require("lodash");


exports.create = function(req, res, next) {
  var chanels = new Chanels();    

  chanels.name = req.body.name;
  
  chanels.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Issue created!' });
  });

};

