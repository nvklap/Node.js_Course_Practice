import { getMockReq, getMockRes } from '@jest-mock/express';
import { ValidationError } from 'joi';
import { Error } from 'mongoose';

import CustomError from '../utils/CustomError';
import { errorHandler } from './errorHandler.middleware';

describe('ErroHandler', () => {
	const req = getMockReq();
	const { res, next } = getMockRes();

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return 500', async () => {
		const error = new Error('error');

		errorHandler(error, req, res, next);

		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith({
			error: { statusCode: 500, message: expect.any(String) },
		});
	});

	it('should return 422 in the case of Joi ValidationError', async () => {
		const error = new ValidationError(
			`error text`,
			[
				{
					message: 'error text',
					path: ['Array'],
					type: 'string.empty',
					context: [Object],
				},
			],
			{ name: '' }
		);

		errorHandler(error, req, res, next);

		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(422);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith({
			error: { statusCode: 422, message: expect.any(String) },
		});
	});

	it('should return 422 in the case of Mongoose CastError', async () => {
		const error = new Error.CastError('CastError', 'some_sring', '_id');

		errorHandler(error, req, res, next);

		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(422);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith({
			error: { statusCode: 422, message: expect.any(String) },
		});
	});

	it('should return statusCode and message in the case of CustomError', async () => {
		const error = new CustomError('error message', 404);

		errorHandler(error, req, res, next);

		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith({
			error: { statusCode: 404, message: expect.any(String) },
		});
	});
});
