var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TourSchema = new Schema({
    dates: [{
        month: { type: String },
        day: { type: Number },
        weekday: { type: String },

        location: { type: String },
        venue: { type: String },
        country: { type: String }
    }]
}, { collection: "tour" });


//Export model
module.exports = mongoose.model('Tour', TourSchema);