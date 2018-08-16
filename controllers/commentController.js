var Comment = require('../models/comment');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter')


exports.index = function (req, res) {
    async.parallel({
        comment_count: function (callback) {
            Comment.count({}, callback);
        }
    }, function (err, results) {
        res.render("landing");
    });
};

exports.comment_list = function (req, res, next) {
    Comment.find()
        .sort([['date', 'ascending']])
        .exec(function (err, list_comments) {
            if (err) { return next(err); }
            //Successful, so render
            res.json(list_comments[0].comments)

        });

};

// Handle Author create on POST.
exports.comment_create_post = [
    // Validate: To DO


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
            var comment = {
                date: Date.now(),
                user: req.body.user,
                text: req.body.text
            }

            Comment.findOneAndUpdate({ name: req.body.album }, { $push: { comments: comment } }, function (err) {
                if (err) { return next(err); }
                res.redirect("/");
            });
        }
    }
];
