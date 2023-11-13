import { ExternalValidationFunction } from 'joi';
import Genre from '../models/genre.model';
import CustomError from './CustomError';

export const isGenreUnique = async (
	name: string
): Promise<ReturnType<ExternalValidationFunction>> => {
	const genre = await Genre.findOne({ name });
	if (genre) {
		throw new CustomError(
			`${name} already exist. Genre should be unique!`,
			422
		);
	}
	return genre;
};
