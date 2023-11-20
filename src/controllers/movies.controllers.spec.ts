import { getMockReq, getMockRes } from '@jest-mock/express';

import * as movieController from './movies.controllers';
import Movie from '../models/movie.model';
import Genre from '../models/genre.model';
import { genresMockData, moviesMockData } from '../__mock__/data';

describe('movieController', () => {
	const { res, next } = getMockRes();

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getAllMovies', () => {
		const req = getMockReq();

		it('should respond with array of movies', async () => {
			Movie.find = jest.fn().mockResolvedValue(moviesMockData);

			await movieController.getAllMovies(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(moviesMockData);
		});

		it('should call next function if db returns error', async () => {
			const error = new Error('error');
			Movie.find = jest.fn().mockRejectedValue(error);

			await movieController.getAllMovies(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe('createMovie', () => {
		const { _id, ...createdMovie } = moviesMockData[0];
		const req = getMockReq({ body: moviesMockData[0] });

		it('should respond with 201 status and created movie object', async () => {
			Movie.prototype.save = jest.fn().mockReturnValue(moviesMockData[0]);
			await movieController.createMovie(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith({ ...createdMovie, _id });
		});

		it('should call next function if db returns error', async () => {
			const error = new Error('error');
			Movie.prototype.save = jest.fn().mockRejectedValue(error);

			await movieController.createMovie(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe('getMovieById', () => {
		it('should respond with 200 status and found movie', async () => {
			const req = getMockReq({
				params: { movieId: moviesMockData[0]._id },
			});

			Movie.findById = jest.fn().mockResolvedValue(moviesMockData[0]);

			await movieController.getMovieById(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(moviesMockData[0]);
		});

		it('should call next with 404 statusCode if there is no movie with specified ID', async () => {
			const id = 'not_found_id';
			const req = getMockReq({
				params: { movieId: id },
			});
			Movie.findById = jest.fn().mockResolvedValue(null);
			await movieController.getMovieById(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: 404,
				})
			);
		});

		it('should call next if db returns error', async () => {
			const req = getMockReq({
				params: { genreId: moviesMockData[0]._id },
			});
			const error = new Error('error');
			Movie.findById = jest.fn().mockRejectedValue(error);

			await movieController.getMovieById(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe('getMoviesByGenre', () => {
		it('should respond with 200 status and found movies array', async () => {
			const req = getMockReq({
				params: { genreName: genresMockData[0].name },
			});
			const genreId = genresMockData.filter(
				(g) => g.name === genresMockData[0].name
			)[0]._id;
			const moviesFound = moviesMockData.filter((m) =>
				m.genre.includes(genreId)
			);

			Genre.findOne = jest.fn().mockResolvedValue(genreId);
			Movie.find = jest.fn().mockResolvedValue(moviesFound);

			await movieController.getMoviesByGenre(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(moviesFound);
		});

		it('should respond with 200 statusCode and empty array if movies with specified genre does not exist in db', async () => {
			const genreName = genresMockData[genresMockData.length - 1].name;
			const req = getMockReq({
				params: { genreName },
			});
			const genreId = genresMockData.filter((g) => g.name === genreName)[0]._id;
			const moviesFound = moviesMockData.filter((m) =>
				m.genre.includes(genreId)
			);

			Genre.findOne = jest.fn().mockResolvedValue(genreId);
			Movie.find = jest.fn().mockResolvedValue(moviesFound);

			await movieController.getMoviesByGenre(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith([]);
		});

		it('should call next with 404 statusCode if the specified genre does not exist in db', async () => {
			const req = getMockReq({
				params: { genreName: 'non existing genre name' },
			});

			Genre.findOne = jest.fn().mockResolvedValue(null);

			await movieController.getMoviesByGenre(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: 404,
				})
			);
		});

		it('should call next if  genre collection returns error', async () => {
			const req = getMockReq({
				params: { genreName: genresMockData[0].name },
			});
			const error = new Error('error');

			Genre.findOne = jest.fn().mockRejectedValue(error);
			Movie.find = jest.fn().mockResolvedValue(moviesMockData);
			await movieController.getMovieById(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});

		it('should call next if  movie collection returns error', async () => {
			const req = getMockReq({
				params: { genreName: genresMockData[0].name },
			});
			const error = new Error('error');

			Genre.findOne = jest.fn().mockResolvedValue(genresMockData[0]._id);
			Movie.find = jest.fn().mockRejectedValue(error);

			await movieController.getMovieById(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe('updateMovie', () => {
		const { _id, ...updatedMovie } = moviesMockData[0];
		const reqData = {
			body: { ...updatedMovie, title: 'New Title' },
			params: { movieId: _id },
		};

		it('should respond with 200 status and updated movie', async () => {
			const req = getMockReq(reqData);

			Movie.findByIdAndUpdate = jest
				.fn()
				.mockResolvedValue({ ...updatedMovie, title: reqData.body.title, _id });

			await movieController.updateMovie(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenLastCalledWith({
				...updatedMovie,
				title: reqData.body.title,
				_id,
			});
		});

		it('should call next with 404 statusCode if there is no movie with specified ID', async () => {
			const req = getMockReq({
				...reqData,
				params: { movieId: 'not_found_id' },
			});
			Movie.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

			await movieController.updateMovie(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: 404,
				})
			);
		});

		it('should call next if db returns error', async () => {
			const req = getMockReq(reqData);
			Genre.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('error'));

			await movieController.updateMovie(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
		});
	});

	describe('deleteGenre', () => {
		it('should respond with 200 and deleted movie', async () => {
			const req = getMockReq({
				params: { movieId: moviesMockData[0]._id },
			});

			Movie.findByIdAndRemove = jest.fn().mockReturnValue(moviesMockData[0]);

			await movieController.deleteMovie(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(moviesMockData[0]);
		});

		it('should call next with 404 statusCode if there is no movie with specified ID', async () => {
			const id = 'not_found_id';
			const req = getMockReq({
				params: { movieId: id },
			});

			Movie.findByIdAndRemove = jest.fn().mockResolvedValue(null);

			await movieController.deleteMovie(req, res, next);
			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: 404,
				})
			);
		});

		it('should call next if db returns error', async () => {
			const req = getMockReq({
				params: { genreId: moviesMockData[0]._id },
			});
			const error = new Error('error');
			Movie.findByIdAndRemove = jest.fn().mockRejectedValue(new Error('error'));

			await movieController.deleteMovie(req, res, next);
			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});
	});
});
