import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';

import app from '../app';

export const request = supertest(app);
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	await mongoose.connect(mongoServer.getUri(), {});
});

afterAll(async () => {
	if (mongoServer) {
		await mongoose.connection.dropDatabase();
		await mongoose.disconnect();
		await mongoServer.stop();
	}
});
