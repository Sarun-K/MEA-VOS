const Organs = require('../../models/organsModel')

exports.update = function(req, res) {

    // use our bear model to find the bear we want
    Organs.findById(req.params.organId, function(err, organs) {
  
        if (err)
            res.send(err);
  
            organs.name = req.body.name;  // update the bears info
  
        // save the bear
        organs.save(function(err) {
            if (err)
                res.send(err);
  
            res.json({ message: 'Bear updated!' });
        });
  
    });
  };