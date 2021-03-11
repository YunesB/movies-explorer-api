const router = require('express').Router();
const contoller = require('../controllers/movies');
const validateReq = require('../middlewares/validator');

router.get('/movies', contoller.getMovies);
router.post('/movies', validateReq.validateMovieCreation, contoller.createMovie);
router.delete('/movies/:movieId', validateReq.validateMovieId, contoller.deleteMovie);

module.exports = router;
