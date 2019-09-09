var Test     = require('../models/issuesModel');

exports.show = function(req, res) {
    Test.find(function(err, test) {
        if (err)
            res.send(err);

        res.json(test);
    });
};