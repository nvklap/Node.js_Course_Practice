import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

// Connect to db
mongoose
	.connect(MONGO_URI)
	.then((conn) => {
		console.log(`MongoDB Connected: ${conn.connection.host}`);
		app.listen(PORT, (): void =>
			console.log(`Server is listening on ${PORT} port`)
		);
	})
	.catch((err) => console.log(err));
