import { Router } from 'express';
import * as movieController from '../controllers/movies.controllers';
import { MovieJoiSchema } from '../models/movie.model';
import { validate } from '../middleware/validation.middleware';

const router: Router = Router();

router.get('/', movieController.getAllMovies);

router.post('/', validate(MovieJoiSchema), movieController.createMovie);

router.get('/genre/:genreName', movieController.getMoviesByGenre);

router.get('/:movieId', movieController.getMovieById);

router.put('/:movieId', validate(MovieJoiSchema), movieController.updateMovie);

router.delete('/:movieId', movieController.deleteMovie);

export default router;
