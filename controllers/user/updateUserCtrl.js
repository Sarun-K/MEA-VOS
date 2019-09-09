const User = require('../../models/userEdit')
const _ = require("lodash");

exports.update = function(req, res) {

  // use our bear model to find the bear we want
  User.findById(req.params.userId, function(err, user) {

      if (err)
          res.send(err);

      user.username = req.body.username;  // update the bears info
      user.email = req.body.email;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.role = req.body.role;
      user.areaCode = req.body.areaCode;


      // save the bear
      user.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'Bear updated!' });
      });

  });
}

  exports.getId = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
    if (err)
        res.send(err);
    res.json(user);
});
};