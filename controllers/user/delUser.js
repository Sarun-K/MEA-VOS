const User = require('../../models/user')

exports.del = function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}