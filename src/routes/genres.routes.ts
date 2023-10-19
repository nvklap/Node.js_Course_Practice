import { Router } from 'express';

import * as genreController from '../controllers/genres.controllers';

const router = Router();

router.get('/', genreController.gellAllGenres);

router.post('/', genreController.createGenre);

router.get('/:genreId', genreController.getGenre);

router.put('/:genreId', genreController.updateGenre);

router.delete('/:genreId', genreController.deleteGenre);

export default router;
