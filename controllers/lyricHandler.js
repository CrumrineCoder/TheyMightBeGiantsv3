var Tracklist = require('../models/tracklist');
var async = require('async');
var ObjectId = require('mongodb').ObjectID;
var request = require('request');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter')

exports.getLyrics = function (req, res, next) {
    request(
        {
            url : "http://lyric-api.herokuapp.com/api/find/They Might Be Giants/" + req.query.song
        },
        function (error, response, body) {
            res.json(response);
        }
    );
}

exports.getOneAlbum = function(req, res, next) {
    Tracklist.findOne({
        _id: ObjectId(req.query.id)
    }).exec(function(err, documents) {
        if (err) { return next(err); }
        res.json(documents);
    })
}


