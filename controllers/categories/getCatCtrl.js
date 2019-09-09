var Test     = require('../../models/catModel');

exports.show = function(req, res) {
    Test.find(function(err, test) {
        if (err)
            res.send(err);

        res.json(test);
    });
};