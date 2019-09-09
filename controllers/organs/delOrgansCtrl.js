const Organs = require('../../models/organsModel')

exports.del = function(req, res) {
    Organs.remove({
        _id: req.params.organId
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}