const Categorise = require('../../models/issuesModel')

exports.del = function(req, res) {
    Categorise.remove({
        _id: req.params.issueId
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}