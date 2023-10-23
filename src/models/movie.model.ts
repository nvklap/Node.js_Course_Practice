import { Schema, model } from 'mongoose';

import IMovie from '../interfaces/movie.interface';
import Joi from 'joi';

const MovieSchema = new Schema<IMovie>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	release_date: { type: Date, required: true },
	// genre: { type: [String], required: true },
	genre: {
		type: [Schema.Types.ObjectId],
		ref: 'Genre',
		required: [true, 'Genres are required!'],
	},
});

// export type Movie = InferSchemaType<typeof MovieSchema>;
const Movie = model<IMovie>('Movie', MovieSchema);

export const MovieJoiSchema = Joi.object<IMovie>({
	title: Joi.string().min(1).required(),
	description: Joi.string().min(5).required(),
	release_date: Joi.date().required(),
	genre: Joi.array()
		.min(1)
		.items(
			Joi.string()
				.required()
				.regex(/^[0-9a-fA-F]{24}$/, 'object Id')
		)
		.required(),
});

export default Movie;
