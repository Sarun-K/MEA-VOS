var mongoose     = require('mongoose');
const { Schema } = mongoose;

var ChanelsSchema   = new Schema({
    name: String,
},{
    collection: 'Chanels'
});

module.exports = mongoose.model('Chanels', ChanelsSchema);