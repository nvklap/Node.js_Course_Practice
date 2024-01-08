import { getMockReq, getMockRes } from '@jest-mock/express';

import * as genreController from './genres.controllers';
import Genre from '../models/genre.model';
import { genresMockData } from '../__mock__/data';

describe('genreController', () => {
	const { res, next } = getMockRes();

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getAllGenres', () => {
		const req = getMockReq();

		it('should respond with array of genres', async () => {
			Genre.find = jest.fn().mockResolvedValue(genresMockData);

			await genreController.gellAllGenres(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(genresMockData);
		});

		it('should call next function if db returns error', async () => {
			const error = new Error('error');
			Genre.find = jest.fn().mockRejectedValue(error);

			await genreController.gellAllGenres(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe('createGenre', () => {
		const createdGenre = { name: 'comedy' };
		const req = getMockReq({ body: createdGenre });

		it('should respond with 201 status and created genre object', async () => {
			await genreController.createGenre(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining(createdGenre)
			);
		});

		it('should call next function if db returns error', async () => {
			const error = new Error('error');
			Genre.prototype.save = jest.fn().mockRejectedValue(error);

			await genreController.createGenre(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe('getGenre', () => {
		it('should respond with 200 status and found genre', async () => {
			const req = getMockReq({
				params: { genreId: genresMockData[0]._id },
			});
			Genre.findById = jest.fn().mockResolvedValue(genresMockData[0]);

			await genreController.getGenre(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(genresMockData[0]);
		});

		it('should call next with 404 statusCode if there is no genre with specified ID', async () => {
			const id = 'not_found_id';
			const req = getMockReq({
				params: { genreId: id },
			});

			Genre.findById = jest.fn().mockResolvedValue(null);
			await genreController.getGenre(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: 404,
				})
			);
		});

		it('should call next if db returns error', async () => {
			const req = getMockReq({
				params: { genreId: genresMockData[0]._id },
			});
			const error = new Error('error');
			Genre.findById = jest.fn().mockRejectedValue(error);

			await genreController.getGenre(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe('updateGenre', () => {
		const reqData = {
			body: { name: 'updated genre name' },
			params: { genreId: genresMockData[0]._id },
		};

		it('should respond with 200 status and updated genre', async () => {
			const req = getMockReq(reqData);

			Genre.findByIdAndUpdate = jest
				.fn()
				.mockResolvedValue({ ...genresMockData[0], name: reqData.body.name });

			await genreController.updateGenre(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith({
				...genresMockData[0],
				name: reqData.body.name,
			});
		});

		it('should call next with 404 statusCode if there is no genre with specified ID', async () => {
			const req = getMockReq({
				...reqData,
				params: { genreId: 'not_found_id' },
			});
			Genre.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

			await genreController.updateGenre(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: 404,
				})
			);
		});

		it('should call next if db returns error', async () => {
			const req = getMockReq(reqData);
			const error = new Error('error');
			Genre.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

			await genreController.updateGenre(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe('deleteGenre', () => {
		it('should respond with 200 and deleted genre', async () => {
			const req = getMockReq({
				params: { genreId: genresMockData[0]._id },
			});

			Genre.findByIdAndRemove = jest.fn().mockReturnValue(genresMockData[0]);

			await genreController.deleteGenre(req, res, next);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(genresMockData[0]);
		});

		it('should call next with 404 statusCode if there is no genre with specified ID', async () => {
			const req = getMockReq({
				params: { genreId: 'not_found_id' },
			});
			Genre.findByIdAndRemove = jest.fn().mockResolvedValue(null);

			await genreController.deleteGenre(req, res, next);
			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: 404,
				})
			);
		});

		it('should call next if db returns error', async () => {
			const req = getMockReq({
				params: { genreId: genresMockData[0]._id },
			});
			const error = new Error('error');
			Genre.findByIdAndRemove = jest.fn().mockRejectedValue(error);

			await genreController.deleteGenre(req, res, next);
			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(error);
		});
	});
});
