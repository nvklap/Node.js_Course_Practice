import { Schema, model } from 'mongoose';

import IGenre from '../interfaces/genre.interface';

const GenreSchema = new Schema<IGenre>({
	name: { type: String, required: true, unique: true },
});

const Genre = model<IGenre>('Genre', GenreSchema);

export default Genre;
