var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  name: {type: String},
  comments: [{
    date: {type: Date},
    user: {type: String},
    text: {type: String}
  }]
});


//Export model
module.exports = mongoose.model('Comment', CommentSchema);