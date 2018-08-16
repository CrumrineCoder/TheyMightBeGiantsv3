var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TracklistSchema = new Schema({
  name: {type: String},
  tracklist: [{
    id: {type: Number},
    name: {type: String}
  }]
});

//Export model
module.exports = mongoose.model('albums', TracklistSchema);