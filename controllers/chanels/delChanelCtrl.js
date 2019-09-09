const Chanel = require('../../models/chanelsModel')

exports.del = function(req, res) {
    Chanel.remove({
        _id: req.params.chanelId
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}