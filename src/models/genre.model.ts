import { Schema, model } from 'mongoose';
import IGenre from '../interfaces/genre.interface';
import Joi from 'joi';
import { isGenreUnique } from '../utils/isGenreUnique';

const GenreSchema = new Schema<IGenre>({
	name: { type: String, required: true, unique: true },
});

const Genre = model<IGenre>('Genre', GenreSchema);

export const GenreJoiSchema = Joi.object<IGenre>({
	name: Joi.string().min(3).max(25).required().external(isGenreUnique),
});

export default Genre;
