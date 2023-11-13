import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);
			next();
		} catch (error) {
			next(error);
		}
	};
};
