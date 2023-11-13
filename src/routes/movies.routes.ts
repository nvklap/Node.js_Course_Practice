import { Router } from 'express';
import * as movieController from '../controllers/movies.controllers';
import { MovieJoiSchema } from '../models/movie.model';
import { validate } from '../middleware/validation.middleware';

const router: Router = Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     tags:
 *     - Movies
 *     summary: Get list of movies
 *     responses:
 *       200:
 *         description: Return array of the available genre objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   post:
 *     tags:
 *       - Movies
 *     summary: Create a new movie
 *     requestBody:
 *       description: Movie object in JSON format
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieBody'
 *     responses:
 *       201:
 *         description: Returns the created movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /movies/{movieId}:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get a movie by ID
 *     description: Returns movie object in JSON format
 *     parameters:
 *     - in: path
 *       name: movieId
 *       schema:
 *         type: string
 *       required: true
 *       description: Unique ID of movie to get
 *     responses:
 *       200:
 *         description: Get a movie by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     tags:
 *       - Movies
 *     summary: Update movie by ID
 *     description: Returns updated movie object in JSON format
 *     parameters:
 *     - in: path
 *       name: movieId
 *       schema:
 *         type: string
 *       required: true
 *       description: Unique ID of movie to update
 *     requestBody:
 *       description: Movie object in JSON format
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieBody'
 *     responses:
 *       200:
 *         description: Updated Movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     tags:
 *       - Movies
 *     summary: Delete movie by ID
 *     description: Returns deleted movie object in JSON format
 *     parameters:
 *     - in: path
 *       name: movieId
 *       schema:
 *         type: string
 *       required: true
 *       description: Unique ID of movie to delete
 *     responses:
 *       200:
 *         description: Deleted Movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /movies/genre/{genreName}:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get movies by genre name
 *     description: Returns movie object in JSON format
 *     parameters:
 *     - in: path
 *       name: genreName
 *       schema:
 *         type: string
 *       required: true
 *       description: Genre name
 *     responses:
 *       200:
 *         description: Get movies by genre name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */

router.get('/', movieController.getAllMovies);

router.post('/', validate(MovieJoiSchema), movieController.createMovie);

router.get('/genre/:genreName', movieController.getMoviesByGenre);

router.get('/:movieId', movieController.getMovieById);

router.put('/:movieId', validate(MovieJoiSchema), movieController.updateMovie);

router.delete('/:movieId', movieController.deleteMovie);

export default router;
