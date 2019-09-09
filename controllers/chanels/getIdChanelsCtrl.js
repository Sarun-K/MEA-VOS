const Chanel = require('../../models/chanelsModel')

exports.getId = function(req, res) {
  Chanel.findById(req.params.chanelId, function(err, chanel) {
  if (err)
      res.send(err);
  res.json(chanel);
});
};