var mongoose     = require('mongoose');
const { Schema } = mongoose;

var IssuesSchema   = new Schema({

    title: String,
    issueType: String,
    chanel: String,
    description: String,
    complaneDate: Date,
    organization: String,
    file: Array,
    customer: {
                    firstname: String,
                    lastname: String,
                    address: String,
                    phone: String,
                    email: String
    },
    ////////////// userKey
    status: {
        type: String,
        default: ''
    },

    createdBy: String,

    createdById: String,
    },
    
    

{
    collection: 'Issues'
});

module.exports = mongoose.model('issues', IssuesSchema);