import { Router } from 'express';

import * as movieController from '../controllers/movies.controllers';

const router: Router = Router();

router.get('/', movieController.getAllMovies);

router.post('/', movieController.createMovie);

router.get('/genre/:genreName', movieController.getMoviesByGenre);

router.get('/:movieId', movieController.getMovieById);

router.put('/:movieId', movieController.updateMovie);

router.delete('/:movieId', movieController.deleteMovie);

export default router;
