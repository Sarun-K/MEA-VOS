var Test     = require('../../models/organsModel');

exports.show = function(req, res) {
    Test.find(function(err, test) {
        if (err)
            res.send(err);

        res.json(test);
    });
};