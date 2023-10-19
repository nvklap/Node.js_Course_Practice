import { Schema, model } from 'mongoose';

import IMovie from '../interfaces/movie.interface';

const MovieSchema = new Schema<IMovie>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	release_date: { type: Date, required: true },
	genre: [{ type: String, required: true }],
});

const Movie = model<IMovie>('Movie', MovieSchema);

export default Movie;
