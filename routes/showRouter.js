const router = require("express").Router();
const { getNowPlayingMovies } = require("../controllers/showController");

router.get("/now-playing", getNowPlayingMovies);

module.exports = router;
