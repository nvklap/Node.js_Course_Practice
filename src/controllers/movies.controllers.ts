import { NextFunction, Request, Response } from 'express';
import Movie from '../models/movie.model';
import Error from '../interfaces/error.interface';

export const getAllMovies = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await Movie.find();

		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const getMovie = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const movieId = req.params.movieId;

	try {
		const result = await Movie.findById(movieId);

		if (!result) {
			const error: Error = new Error('Could not find a movie');
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const createMovie = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const movie = new Movie({
		title: req.body.title,
		release_date: req.body.release_date,
		description: req.body.description,
		genre: req.body.genre,
	});

	try {
		const result = await movie.save();
		return res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const updateMovie = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const movieId = req.params.movieId;

	const updatedMovie = {
		title: req.body.title,
		release_date: req.body.release_date,
		description: req.body.description,
		genre: req.body.genre,
	};

	try {
		const result = await Movie.findByIdAndUpdate(movieId, updatedMovie, {
			returnDocument: 'after',
		});

		if (!result) {
			const error: Error = new Error('Could not find a movie');
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const deleteMovie = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const movieId = req.params.movieId;

	try {
		const result = await Movie.findByIdAndRemove(movieId);

		if (!result) {
			const error: Error = new Error('Could not find a movie');
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
