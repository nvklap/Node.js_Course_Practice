import { Router } from 'express';

import * as genreController from '../controllers/genres.controllers';
import { GenreJoiSchema } from '../models/genre.model';
import { validate } from '../middleware/validation.middleware';

const router = Router();

/**
 * @swagger
 * /genres:
 *   get:
 *     tags:
 *       - Genres
 *     summary: Get list of genres
 *     description: Return all availables genres in JSON format
 *     responses:
 *       200:
 *         description: Returns the array of all available genre objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   post:
 *     tags:
 *       - Genres
 *     summary: Create a new genre
 *     description: Creates a new genre
 *     requestBody:
 *       description: Genre object in JSON format
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenreBody'
 *     responses:
 *       201:
 *         description: Returns the created genre
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 */

/**
 * @swagger
 * /genres/{genreId}:
 *   get:
 *     tags:
 *       - Genres
 *     summary: Get a genre by ID
 *     description: Returns genre object in JSON format
 *     parameters:
 *     - in: path
 *       name: genreId
 *       schema:
 *         type: string
 *       required: true
 *       description: Unique ID of genre to get
 *     responses:
 *       200:
 *         description: Get a genre by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     tags:
 *       - Genres
 *     summary: Update genre by ID
 *     description: Returns updated genre object in JSON format
 *     parameters:
 *     - in: path
 *       name: genreId
 *       schema:
 *         type: string
 *       required: true
 *       description: Unique ID of genre to update
 *     requestBody:
 *       description: Genre object in JSON format
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenreBody'
 *     responses:
 *       200:
 *         description: Updated Genre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     tags:
 *       - Genres
 *     summary: Delete genre by ID
 *     description: Returns deleted genre object in JSON format
 *     parameters:
 *     - in: path
 *       name: genreId
 *       schema:
 *         type: string
 *       required: true
 *       description: Unique ID of genre to delete
 *     responses:
 *       200:
 *         description: Deleted Genre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 */

router.get('/', genreController.gellAllGenres);

router.post('/', validate(GenreJoiSchema), genreController.createGenre);

router.get('/:genreId', genreController.getGenre);

router.put('/:genreId', validate(GenreJoiSchema), genreController.updateGenre);

router.delete('/:genreId', genreController.deleteGenre);

export default router;
