import { request } from '../__mock__/setup-jest';
import Genre from '../models/genre.model';
import Movie from '../models/movie.model';
import { moviesMockData } from '../__mock__/data';

describe('Movies API endpoints', () => {
	const { _id: __, ...movieBody } = moviesMockData[0];
	const movie = {
		...movieBody,
		release_date: new Date(movieBody.release_date).toISOString(),
	};

	beforeEach(() => {
		jest.restoreAllMocks();
	});

	xdescribe('GET /movies', () => {
		beforeAll(async () => {
			await Movie.create(movieBody);
		});

		afterAll(async () => {
			await Movie.deleteMany();
		});

		it('should respond with array of movies', async () => {
			const response = await request.get('/movies');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual([
				{
					...movie,
					_id: expect.any(String),
				},
			]);
		});

		it('should respond with 500 if db returns error', async () => {
			const movieFindMock = jest.spyOn(Movie, 'find');
			movieFindMock.mockImplementationOnce(
				jest.fn().mockRejectedValueOnce(new Error('error'))
			);

			const response = await request.get('/movies');

			expect(response.status).toEqual(500);
			expect(response.body).toEqual({
				error: {
					statusCode: 500,
					message: expect.any(String),
				},
			});
		});
	});

	describe('GET /movies/genres/:genreName', () => {
		let comedyId: string;

		beforeAll(async () => {
			const createdGenre = await Genre.create([
				{ name: 'comedy' },
				{ name: 'dramedy' },
			]);
			comedyId = createdGenre[0]._id.toString();

			await Movie.insertMany([
				...moviesMockData,
				{ ...movie, genre: [`${comedyId}`] },
			]);
		});

		afterAll(async () => {
			await Genre.deleteMany();
			await Movie.deleteMany();
		});

		it('should return movies with specified genre', async () => {
			const response = await request.get(`/movies/genre/comedy`);

			expect(response.status).toEqual(200);
			expect(response.body.length).toBe(1);
			expect(response.body).toEqual([
				{
					...movie,
					genre: [`${comedyId}`],
					_id: expect.any(String),
				},
			]);
		});

		it('should return empty array if can`t find any movie with specified genre', async () => {
			const response = await request.get(`/movies/genre/dramedy`);

			expect(response.status).toEqual(200);
			expect(response.body.length).toBe(0);
			expect(response.body).toEqual([]);
		});

		it('should return 404 if specified genre does not exist in db', async () => {
			const response = await request.get(`/movies/genre/vampires`);

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				error: {
					statusCode: 404,
					message: expect.any(String),
				},
			});
		});

		it('should respond with 500 if db returns error', async () => {
			const error = new Error('error');
			Movie.find = jest.fn().mockRejectedValue(error);

			const response = await request.get(`/movies/genre/comedy`);

			expect(response.status).toEqual(500);
			expect(response.body).toEqual({
				error: {
					statusCode: 500,
					message: expect.any(String),
				},
			});
		});
	});

	describe('POST /movies', () => {
		afterAll(async () => {
			await Movie.deleteMany();
		});

		it('should add movie to db and return it with _id', async () => {
			const response = await request
				.post('/movies')
				.send(movieBody)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(201);
			expect(response.body).toEqual({
				...movie,
				_id: expect.any(String),
			});
		});

		it('should return 422 if created movie has an empty title', async () => {
			const createdMovie = { ...movieBody, title: '' };
			const response = await request
				.post('/movies')
				.send(createdMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual({
				error: {
					statusCode: 422,
					message: expect.any(String),
				},
			});
		});

		it('should return 422 if created movie has an empty description', async () => {
			const createdMovie = { ...movieBody, description: '' };
			const response = await request
				.post('/movies')
				.send(createdMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual({
				error: {
					statusCode: 422,
					message: expect.any(String),
				},
			});
		});

		it('should return 422 if created movie has release_date in wrong format', async () => {
			const createdMovie = { ...movieBody, release_date: '2023-99-99' };
			const response = await request
				.post('/movies')
				.send(createdMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual({
				error: {
					statusCode: 422,
					message: expect.any(String),
				},
			});
		});

		it('should return 422 if created movie has an empty release_date', async () => {
			const createdMovie = { ...movieBody, release_date: '' };
			const response = await request
				.post('/movies')
				.send(createdMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual({
				error: {
					statusCode: 422,
					message: expect.any(String),
				},
			});
		});

		it('should return 422 if created movie has empty genre', async () => {
			const createdMovie = { ...movieBody, genre: [] };
			const response = await request
				.post('/movies')
				.send(createdMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual({
				error: {
					statusCode: 422,
					message: expect.any(String),
				},
			});
		});

		it('should respond with 500 if server returns error', async () => {
			const genreFindAndUpdatedMock = jest.spyOn(Movie.prototype, 'save');
			genreFindAndUpdatedMock.mockImplementationOnce(
				jest.fn().mockRejectedValueOnce(new Error('error'))
			);

			const response = await request
				.post(`/movies`)
				.send(movieBody)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(500);
			expect(response.body).toEqual({
				error: {
					statusCode: 500,
					message: expect.any(String),
				},
			});
		});
	});

	describe('GET /movies/:movieId', () => {
		let movieId: string;

		beforeAll(async () => {
			const newMovie = new Movie(movieBody);
			const response = await newMovie.save();
			movieId = response._id.toString();
		});

		afterAll(async () => {
			await Genre.deleteMany();
		});

		it('should return movie with specified ID', async () => {
			const response = await request.get(`/movies/${movieId}`);

			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				...movie,
				_id: movieId,
			});
		});

		it('should respond with 404 if movie with specified ID does not exist in db', async () => {
			const response = await request.get(`/movies/653250c0b81c59abd554d463`);

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				error: {
					statusCode: 404,
					message: expect.any(String),
				},
			});
		});

		it('should respond with 500 if server returns error', async function () {
			const error = new Error('error');
			Movie.findById = jest.fn().mockRejectedValue(error);

			const response = await request.get(`/movies/${movieId}`);

			expect(response.status).toEqual(500);
			expect(response.body).toEqual({
				error: {
					statusCode: 500,
					message: expect.any(String),
				},
			});
		});
	});

	describe('PUT /movies/:movieId', () => {
		let movieId: string;

		beforeAll(async () => {
			const newMovie = new Movie(movieBody);
			const response = await newMovie.save();
			movieId = response._id.toString();
		});

		afterAll(async () => {
			await Genre.deleteMany();
		});

		it('should update movie', async () => {
			const updatedMovie = { ...movieBody, title: 'Psycho' };
			const response = await request
				.put(`/movies/${movieId}`)
				.send(updatedMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				...movie,
				title: updatedMovie.title,
				_id: expect.any(String),
			});
		});

		it('should return 422 if updated movie has an empty title', async () => {
			const updatedMovie = { ...movieBody, title: '' };
			const response = await request
				.put(`/movies/${movieId}`)
				.send(updatedMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual({
				error: {
					statusCode: 422,
					message: expect.any(String),
				},
			});
		});

		it('should return 422 if updated movie has an empty description', async () => {
			const updatedMovie = { ...movieBody, description: '' };
			const response = await request
				.put(`/movies/${movieId}`)
				.send(updatedMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual({
				error: {
					statusCode: 422,
					message: expect.any(String),
				},
			});
		});

		it('should return 422 if updated movie has release_date in wrong format', async () => {
			const updatedMovie = { ...movieBody, release_date: '2023-99-99' };
			const response = await request
				.put(`/movies/${movieId}`)
				.send(updatedMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual({
				error: {
					statusCode: 422,
					message: expect.any(String),
				},
			});
		});

		it('should return 422 if updated movie has an empty release_date', async () => {
			const updatedMovie = { ...movieBody, release_date: '' };
			const response = await request
				.put(`/movies/${movieId}`)
				.send(updatedMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual({
				error: {
					statusCode: 422,
					message: expect.any(String),
				},
			});
		});

		it('should return 422 if updated movie has empty genre', async () => {
			const updatedMovie = { ...movieBody, genre: [] };
			const response = await request
				.put(`/movies/${movieId}`)
				.send(updatedMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(422);
			expect(response.body).toEqual({
				error: {
					statusCode: 422,
					message: expect.any(String),
				},
			});
		});

		it('should respond with 404 if movie with specified ID does not exist in db', async () => {
			const updatedMovie = { ...movieBody, title: 'Psycho' };
			const response = await request
				.put(`/movies/653250c0b81c59abd554d463`)
				.send(updatedMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				error: {
					statusCode: 404,
					message: expect.any(String),
				},
			});
		});

		it('should respond with 500 if server returns error', async () => {
			const error = new Error('error');
			Movie.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

			const updatedMovie = { ...movieBody, title: 'Psycho 4' };
			const response = await request
				.put(`/movies/${movieId}`)
				.send(updatedMovie)
				.set('Accept', 'application/json');

			expect(response.status).toEqual(500);
			expect(response.body).toEqual({
				error: {
					statusCode: 500,
					message: expect.any(String),
				},
			});
		});
	});

	describe('DELETE /movies/:movieId', () => {
		let movieId: string;

		beforeAll(async () => {
			const newMovie = new Movie(movieBody);
			const response = await newMovie.save();
			movieId = response._id.toString();
		});

		afterAll(async () => {
			await Movie.deleteMany();
		});

		it('should delete movie', async () => {
			const response = await request.delete(`/movies/${movieId}`);

			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				...movie,
				_id: movieId,
			});
		});

		it('should respond with 404 if movie with specified ID does not exist in db', async () => {
			const response = await request.delete(`/movies/${movieId}`);

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				error: {
					statusCode: 404,
					message: expect.any(String),
				},
			});
		});

		it('should respond with 500 if server returns error', async () => {
			const error = new Error('error');
			Movie.findByIdAndRemove = jest.fn().mockRejectedValue(error);
			const response = await request.delete(`/movies/${movieId}`);

			expect(response.status).toEqual(500);
			expect(response.body).toEqual({
				error: {
					statusCode: 500,
					message: expect.any(String),
				},
			});
		});
	});
});
