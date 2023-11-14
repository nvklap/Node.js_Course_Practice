import { getMockReq, getMockRes } from '@jest-mock/express';
import { ValidationError } from 'joi';
import { validate } from './validation.middleware';
import { GenreJoiSchema } from '../models/genre.model';
import { MovieJoiSchema } from '../models/movie.model';
import { moviesMockData } from '../__mock__/data';

describe('Validation', () => {
	const { res, next } = getMockRes();

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('Genres', () => {
		it('should call next with no arguments if validation succeeds', async () => {
			const req = getMockReq({ body: { name: 'new genre' } });

			const middleware = validate(GenreJoiSchema);
			await middleware(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith();
		});

		it('should call next with validation error if genre name is empty', async () => {
			const req = getMockReq({ body: { name: '' } });

			const middleware = validate(GenreJoiSchema);
			await middleware(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
		});
	});

	describe('Movies', () => {
		const { _id: __, ...movieBody } = moviesMockData[0];

		it('should call next with no arguments if validation succeeds', async () => {
			const req = getMockReq({ body: movieBody });

			const middleware = validate(MovieJoiSchema);
			await middleware(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith();
		});

		it('should call next with validation error if movie title is empty', async () => {
			const req = getMockReq({
				body: { ...movieBody, title: '' },
			});

			const middleware = validate(MovieJoiSchema);
			await middleware(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
		});

		it('should call next with validation error if movie description is empty or is less then 5 chars', async () => {
			const req = getMockReq({
				body: { ...movieBody, description: 'hehe' },
			});

			const middleware = validate(MovieJoiSchema);
			await middleware(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
		});

		it('should call next with validation error if movie release_date does not follow YYYY-MM-DD format', async () => {
			const req = getMockReq({
				body: { ...movieBody, release_date: '11-12-2023' },
			});

			const middleware = validate(MovieJoiSchema);
			await middleware(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
		});

		it('should call next with validation error if movie genre array has no items', async () => {
			const req = getMockReq({
				body: { ...movieBody, genre: [] },
			});

			const middleware = validate(MovieJoiSchema);
			await middleware(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
		});

		it('should call next with validation error if items in movie genre array do not follow object Id pattern', async () => {
			const req = getMockReq({
				body: { ...movieBody, genre: ['some genre'] },
			});

			const middleware = validate(MovieJoiSchema);
			await middleware(req, res, next);

			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
		});
	});
});
