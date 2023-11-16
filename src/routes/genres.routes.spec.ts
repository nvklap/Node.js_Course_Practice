import { request } from '../__mock__/setup-jest';
import Genre from '../models/genre.model';
import { genresMockData } from '../__mock__/data';

describe('Genres Api endpoints', () => {
	beforeEach(() => {
		jest.restoreAllMocks();
	});

	describe('GET /genres', () => {
		afterAll(async () => {
			await Genre.deleteMany();
		});

		it('should respond with array of genres', async () => {
			await Genre.create(genresMockData[0]);
			const response = await request.get('/genres');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(
				expect.objectContaining([
					{
						name: genresMockData[0].name,
						_id: expect.any(String),
					},
				])
			);
		});

		it('should respond with 500 if db returns error', async () => {
			const error = new Error('error');
			Genre.find = jest.fn().mockRejectedValue(error);

			const response = await request.get('/genres');

			expect(response.status).toEqual(500);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 500,
						message: expect.any(String),
					},
				})
			);
		});
	});

	describe('POST /genred', () => {
		beforeAll(async () => {
			const newGenre = new Genre({ name: 'comedy' });
			await newGenre.save();
		});

		afterAll(async () => {
			await Genre.deleteMany();
		});

		it('should add genre to db and return it with _id', async () => {
			const response = await request
				.post('/genres')
				.send({ name: 'mystery' })
				.set('Accept', 'application/json');

			expect(response.status).toEqual(201);
			expect(response.body).toEqual(
				expect.objectContaining({
					name: 'mystery',
					_id: expect.any(String),
				})
			);
		});

		it('should return 422 if created genre has an empty name', async () => {
			const createdGenre = { name: '' };
			const response = await request
				.post('/genres')
				.send(createdGenre)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 422,
						message: expect.any(String),
					},
				})
			);
		});

		it('should return 422 if created genre is not unique', async () => {
			const createdGenre = { name: 'comedy' };
			const response = await request
				.post('/genres')
				.send(createdGenre)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 422,
						message: expect.any(String),
					},
				})
			);
		});

		it('should respond with 500 if server returns error', async () => {
			const genreSaveMock = jest.spyOn(Genre.prototype, 'save');
			genreSaveMock.mockImplementationOnce(
				jest.fn().mockRejectedValueOnce(new Error('error'))
			);

			const createdGenre = { name: 'history' };
			const response = await request
				.post(`/genres`)
				.send(createdGenre)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(500);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 500,
						message: expect.any(String),
					},
				})
			);
		});
	});

	describe('GET /genres/:genreId', () => {
		let genreId: string;
		const genre = { name: 'comedy' };

		beforeAll(async () => {
			const newGenre = new Genre(genre);
			const response = await newGenre.save();
			genreId = response._id.toString();
		});

		afterAll(async () => {
			await Genre.deleteMany();
		});

		it('should return genre with specified ID', async () => {
			const response = await request.get(`/genres/${genreId}`);

			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				...genre,
				_id: genreId,
			});
		});

		it('should respond with 404 if genre with specified ID does not exist in db', async () => {
			const response = await request.get(`/genres/653250c0b81c59abd554d463`);

			expect(response.status).toEqual(404);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 404,
						message: expect.any(String),
					},
				})
			);
		});

		it('should respond with 422 if ID is not ObjectId type', async () => {
			const response = await request.get(`/genres/invalid_id`);

			expect(response.status).toEqual(422);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 422,
						message: expect.any(String),
					},
				})
			);
		});

		it('should respond with 500 if server returns error', async () => {
			const error = new Error('error');
			Genre.findById = jest.fn().mockRejectedValue(error);

			const response = await request.get(`/genres/${genreId}`);

			expect(response.status).toEqual(500);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 500,
						message: expect.any(String),
					},
				})
			);
		});
	});

	describe('PUT /genres/:genreId', () => {
		let genreId: string;
		const genre = { name: 'comedy' };

		beforeAll(async () => {
			const newGenre = new Genre(genre);
			const response = await newGenre.save();
			genreId = response._id.toString();
		});

		afterAll(async () => {
			await Genre.deleteMany();
		});

		it('should update genre', async () => {
			const updatedGenre = { name: 'tragedy' };
			const response = await request
				.put(`/genres/${genreId}`)
				.send(updatedGenre)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(
				expect.objectContaining({
					...updatedGenre,
					_id: genreId,
				})
			);
		});

		it('should return 422 if updated genre has an empty name', async () => {
			const updatedGenre = { name: '' };
			const response = await request
				.put(`/genres/${genreId}`)
				.send(updatedGenre)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 422,
						message: expect.any(String),
					},
				})
			);
		});

		it('should return 422 if updated movie`s is not unique', async () => {
			const updatedGenre = { name: 'tragedy' };
			const response = await request
				.put(`/genres/${genreId}`)
				.send(updatedGenre)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 422,
						message: expect.any(String),
					},
				})
			);
		});

		it('should respond with 404 if genre with specified ID does not exist in db', async () => {
			const updatedGenre = { name: 'mocumentary' };
			const response = await request
				.put(`/genres/653fa2a428cff6c1a6de3966`)
				.send(updatedGenre)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(404);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 404,
						message: expect.any(String),
					},
				})
			);
		});

		it('should respond with 500 if server returns error', async () => {
			const error = new Error('error');
			Genre.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

			const updatedGenre = { name: 'vampires' };
			const response = await request
				.put(`/genres/${genreId}`)
				.send(updatedGenre)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(500);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 500,
						message: expect.any(String),
					},
				})
			);
		});
	});

	describe('DELETE /genres/:genreId', () => {
		let genreId: string;
		const genre = { name: 'comedy' };

		beforeAll(async () => {
			const newGenre = new Genre(genre);
			const response = await newGenre.save();
			genreId = response._id.toString();
		});

		afterAll(async () => {
			await Genre.deleteMany();
		});

		it('should delete genre', async () => {
			const response = await request.delete(`/genres/${genreId}`);

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(
				expect.objectContaining({
					...genre,
					_id: genreId,
					name: genre.name,
				})
			);
		});

		it('should respond with 404 if genre with specified ID does not exist in db', async () => {
			const response = await request.delete(`/genres/${genreId}`);

			expect(response.status).toEqual(404);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 404,
						message: expect.any(String),
					},
				})
			);
		});

		it('should respond with 500 if server returns error', async () => {
			const error = new Error('error');
			Genre.findByIdAndRemove = jest.fn().mockRejectedValue(error);

			const response = await request.delete(`/genres/${genreId}`);

			expect(response.status).toEqual(500);
			expect(response.body).toEqual(
				expect.objectContaining({
					error: {
						statusCode: 500,
						message: expect.any(String),
					},
				})
			);
		});
	});
});
