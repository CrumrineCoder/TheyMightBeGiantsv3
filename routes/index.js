var express = require('express');
var router = express.Router();
var comment_controller = require('../controllers/commentController.js');
var tourHandler = require('../controllers/tourHandler.js');
var lyricHandler = require('../controllers/lyricHandler.js');
var mapHandler = require("../controllers/mapHandler.js")

// GET home page.
router.get('/', comment_controller.index);

// POST request for creating Comments.
router.post('/create', comment_controller.comment_create_post);

// GET request for list of all Comments.
router.get('/comments', comment_controller.comment_list);

// GET request for list of all Tours
router.get('/tours', tourHandler.tour_list);

router.get('/geocoding/', mapHandler.geocoding);

//router.post('/create2', tourHandler.tour_create_post);

router.get('/api/song/', lyricHandler.getLyrics);

router.get('/api/album/', lyricHandler.getOneAlbum);


module.exports = router;