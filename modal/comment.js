const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {type: String, require: true},
    comment: {type: String, require: true},
    email: {type: String, require: true},
    website: {type: String, require: true}
});

const Comments = mongoose.model('Comments', commentSchema);

module.exports = { Comments };


