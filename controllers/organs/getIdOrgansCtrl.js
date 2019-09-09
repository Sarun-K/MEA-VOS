const Organs = require('../../models/organsModel')

exports.getId = function(req, res) {
    Organs.findById(req.params.organId, function(err, organs) {
    if (err)
        res.send(err);
    res.json(organs);
  });
  };