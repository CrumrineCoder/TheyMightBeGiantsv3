var Tour = require('../models/tour.js');

var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter')

exports.tour_list = function (req, res, next) {
    Tour.find()
    .sort([['dates', 'ascending']])
    .exec(function (err, list_tour) {
      if (err) { return next(err); }
      //Successful, so render
      res.json(list_tour)
   //   res.render('comment_list', { comment_list: list_comments[0].comments});
    });

};
/*
// Handle Author create on POST.
exports.tour_create_post = [

    // Validate fields

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('landing', { title: 'Create Comment', comment: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid
            var tourDate = new Tour ();
            tourDate.dates = {
                month: req.body.month,
                day: parseInt(req.body.day),
                weekday: req.body.weekday,
        
                location: req.body.location,
                venue: req.body.venue,
                country: req.body.country
            };

            Tour.findOneAndUpdate({year: 2018}, { $push: { dates: tourDate.dates} }, function (err,results) {
                if (err) { return next(err); }
                res.redirect("/");
            });

        }
    }
];
*/