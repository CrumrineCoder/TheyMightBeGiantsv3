var request = require('request');

exports.geocoding = function (req, res, next) {
    request(
        {
            url : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.query.address + "&key=" + process.env.geoKey
        },
        function (error, response, body) {
            res.send({geoData: response, id: req.query.id});
        }
    );
};