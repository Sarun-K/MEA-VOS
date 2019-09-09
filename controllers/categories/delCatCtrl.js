const Categorise = require('../../models/catModel')

exports.del = function(req, res) {
    Categorise.remove({
        _id: req.params.catId
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}