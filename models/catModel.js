
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CatSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  detail: {
    type: String
  }
}, { collection: 'Categories'});

module.exports = mongoose.model('category', CatSchema);