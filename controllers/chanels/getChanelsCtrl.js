var Test     = require('../../models/chanelsModel');

exports.show = function(req, res) {
    Test.find(function(err, test) {
        if (err)
            res.send(err);
        res.json(test);
    });
};