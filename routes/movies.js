const router = require('express').Router();
const contoller = require('../controllers/movies');
// const validateReq = require('../middlewares/validator');

router.get('/movies', contoller.getMovies);
router.post('/movies', contoller.createMovie);
router.delete('/movies/:movieId', contoller.deleteMovie);

// router.put('/movies/:movieId/likes', validateReq.validateMovieId, contoller.likeMovie);
// router.delete('/movies/:movieId/likes', validateReq.validateMovieId, contoller.dislikeMovie);

module.exports = router;
