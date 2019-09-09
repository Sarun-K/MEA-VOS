const Chanel = require('../../models/chanelsModel')

exports.update = function(req, res) {

    // use our bear model to find the bear we want
    Chanel.findById(req.params.chanelId, function(err, chanel) {
  
        if (err)
            res.send(err);
  
            chanel.name = req.body.name;  // update the bears info
  
        // save the bear
        chanel.save(function(err) {
            if (err)
                res.send(err);
  
            res.json({ message: 'Bear updated!' });
        });
  
    });
  };