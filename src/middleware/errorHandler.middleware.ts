import { NextFunction, Request, Response } from 'express';
import Error from '../interfaces/error.interface';

const errorHandler = (
	error: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	const statusCode = error.statusCode || 500;
	const message = error.message || 'Internal Server Error';

	res.status(statusCode).json({ error: { statusCode, message } });
};

export default errorHandler;
