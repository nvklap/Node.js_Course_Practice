import { isGenreUnique } from './isGenreUnique';
import Genre from '../models/genre.model';
import { genresMockData } from '../__mock__/data';
import CustomError from './CustomError';

describe('isGenreUnique', () => {
	it('should return null if genre value is unique', async () => {
		Genre.findOne = jest.fn().mockResolvedValue(null);

		const result = await isGenreUnique('unique genre');

		expect(result).toBeNull();
	});

	it('should throw custom error with status code 422 if genre is already exist in db', async () => {
		const error = new CustomError(
			`${genresMockData[0].name} already exist. Genre should be unique!`,
			422
		);
		Genre.findOne = jest.fn().mockResolvedValue(genresMockData[0]);

		expect(
			async () => await isGenreUnique(genresMockData[0].name)
		).rejects.toThrow(error);
	});
});
