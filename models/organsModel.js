var mongoose     = require('mongoose');
const { Schema } = mongoose;

var OrgansSchema   = new Schema({
    name: String,
},{
    collection: 'Oganizations'
});

module.exports = mongoose.model('organs', OrgansSchema);