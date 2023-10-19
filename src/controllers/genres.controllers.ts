import { NextFunction, Request, Response } from 'express';
import Genre from '../models/genre.model';
import Error from '../interfaces/error.interface';

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
	const name = req.body.name;

	try {
		const genre = await Genre.find({ name });

		if (genre.length) {
			const error: Error = new Error(
				`${name} already exist. Genre should be unique!`
			);
			error.statusCode = 422;
			throw error;
		}

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
			const error: Error = new Error('Could not find a genre');
			error.statusCode = 404;
			throw error;
		}

		return res.status(200).json(genre);
	} catch (error) {
		next(error);
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
			const error: Error = new Error('Could not find a genre');
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json(genre);
	} catch (error) {
		next(error);
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
			const error: Error = new Error('Could not find a genre');
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json(genre);
	} catch (error) {
		next(error);
	}
};
