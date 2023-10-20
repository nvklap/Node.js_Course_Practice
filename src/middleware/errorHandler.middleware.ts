import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import CustomError from '../interfaces/error.interface';

function isCustomError(value: unknown): value is CustomError {
	return value !== null && typeof value === 'object' && 'message' in value;
}

const errorHandler = (
	error: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	let statusCode = 500;
	let message = 'Internal Server Error';
	if (
		error instanceof Error.CastError ||
		error instanceof Error.ValidationError
	) {
		statusCode = 422;
		message = error.message;
	} else if (isCustomError(error)) {
		statusCode = error.statusCode ?? statusCode;
		message = error.message;
	}

	res.status(statusCode).json({ error: { statusCode, message } });
};

export default errorHandler;
