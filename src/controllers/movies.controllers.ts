import { NextFunction, Request, Response } from 'express';

import Movie from '../models/movie.model';
import Genre from '../models/genre.model';
import CustomError from '../utils/CustomError';

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

export const getMovieById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const movieId = req.params.movieId;

	try {
		const result = await Movie.findById(movieId);

		if (!result) {
			throw new CustomError(`Could not find a movie with ${movieId} ID`, 404);
		}

		res.status(200).json(result);
	} catch (error) {
		return next(error);
	}
};

export const getMoviesByGenre = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const genreName = req.params.genreName;

	try {
		const genre = await Genre.findOne({ name: genreName });

		if (!genre) {
			throw new CustomError(
				`Could not find a movie with ${genreName} genre`,
				404
			);
		}

		const movies = await Movie.find({ genre: genre._id });

		res.status(200).json(movies);
	} catch (error) {
		return next(error);
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
			throw new CustomError(
				`Could not update a movie with ${movieId} ID because there is no movie with this ID`,
				404
			);
		}

		res.status(200).json(result);
	} catch (error) {
		return next(error);
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
			throw new CustomError(
				`Could not delete a movie with ${movieId} ID because there is no movie with this ID`,
				404
			);
		}

		res.status(200).json(result);
	} catch (error) {
		return next(error);
	}
};
