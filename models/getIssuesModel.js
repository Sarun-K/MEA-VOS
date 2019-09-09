var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var BearSchema   = new Schema({
    eieiza: String
},{
    collection: 'Users'
});

module.exports = mongoose.model('Test', BearSchema);