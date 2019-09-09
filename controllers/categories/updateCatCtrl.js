const Categorise = require('../../models/catModel')
const _ = require("lodash");

exports.update = function(req, res) {

  // use our bear model to find the bear we want
  Categorise.findById(req.params.catId, function(err, categorise) {

      if (err)
          res.send(err);

          categorise.name = req.body.name;  // update the bears info

      // save the bear
      categorise.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'Bear updated!' });
      });

  });
}

exports.getId = function(req, res) {
  Categorise.findById(req.params.catId, function(err, categorise) {
  if (err)
      res.send(err);
  res.json(categorise);
});
};