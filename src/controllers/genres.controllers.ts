import { NextFunction, Request, Response } from 'express';
import Genre from '../models/genre.model';
import IGenre from '../interfaces/genre.interface';
import CustomError from '../utils/CustomError';

export const gellAllGenres = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const genres = await Genre.find();
		return res.status(200).json(genres);
	} catch (error) {
		next(error);
	}
};

export const createGenre = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name } = req.body as IGenre;

	try {
		const createdGenre = new Genre({ name });
		const result = await createdGenre.save();

		return res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const getGenre = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const genreId = req.params.genreId;
	try {
		const genre = await Genre.findById(genreId);

		if (!genre) {
			throw new CustomError(`Could not find a genre with ${genreId} ID`, 404);
		}

		return res.status(200).json(genre);
	} catch (error) {
		return next(error);
	}
};

export const updateGenre = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const genreId = req.params.genreId;
	const updatedGenre = { name: req.body.name };
	try {
		const genre = await Genre.findByIdAndUpdate(genreId, updatedGenre, {
			returnDocument: 'after',
		});

		if (!genre) {
			throw new CustomError(
				`Could not update a genre with ${genreId} ID because there is no genre with this ID`,
				404
			);
		}

		res.status(200).json(genre);
	} catch (error) {
		return next(error);
	}
};

export const deleteGenre = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const genreId = req.params.genreId;

	try {
		const genre = await Genre.findByIdAndRemove(genreId);

		if (!genre) {
			throw new CustomError(
				`Could not delete a movie with ${genreId} ID because there is no movie with this ID`,
				404
			);
		}

		res.status(200).json(genre);
	} catch (error) {
		return next(error);
	}
};
