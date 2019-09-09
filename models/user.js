const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
        
        username: {
          type: String,
          unique: true,
          trim: true,
          required: "Username is required.",
          index: true
        },
        email: {
          type: String,
          lowercase: true
        },
        role: {
          type: String,
          enum: ["admin", "user"],
          default: "user"
        },
        password: {
          type: String
        },
        firstname: String,
        lastname: String,

        areaCode: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      },{
    collection: 'Users'
});
// hash user password before saving into database
UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});
module.exports = mongoose.model('User', UserSchema);