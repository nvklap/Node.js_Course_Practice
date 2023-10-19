import { Router } from 'express';

import * as movieController from '../controllers/movies.controllers';

const router: Router = Router();

router.get('/', movieController.getAllMovies);

router.post('/', movieController.createMovie);

router.get('/:movieId', movieController.getMovie);

router.put('/:movieId', movieController.updateMovie);

router.delete('/:movieId', movieController.deleteMovie);

export default router;
