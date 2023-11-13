import { Schema, model } from 'mongoose';
import * as coreJoi from 'joi';
import * as joiDate from '@joi/date';
import IMovie from '../interfaces/movie.interface';
const Joi = coreJoi.extend(joiDate.default(coreJoi)) as typeof coreJoi;

const MovieSchema = new Schema<IMovie>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		release_date: { type: Date, required: true },
		genre: {
			type: [Schema.Types.ObjectId],
			ref: 'Genre',
			required: [true, 'Genres are required!'],
		},
	},
	{ versionKey: false }
);

const Movie = model<IMovie>('Movie', MovieSchema);

export const MovieJoiSchema = Joi.object<IMovie>({
	title: Joi.string().min(1).required(),
	description: Joi.string().min(5).required(),
	release_date: Joi.date().format('YYYY-MM-DD').required(),
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
