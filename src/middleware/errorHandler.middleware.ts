import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { ValidationError } from 'joi';
import CustomError from '../utils/CustomError';

export const errorHandler = (
	error: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	let statusCode = 500;
	let message = 'Something went wrong';

	if (
		error instanceof Error.CastError ||
		error instanceof ValidationError ||
		error instanceof Error.ValidationError
	) {
		statusCode = 422;
		message = error.message.replace(/"/g, '');
	} else if (error instanceof CustomError) {
		statusCode = error.statusCode;
		message = error.message;
	}

	res.status(statusCode).json({ error: { statusCode, message } });
};

export default errorHandler;
