import express, { Request, Response, Express, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import mongoose from 'mongoose';

import swaggerSpec from './utils/swagger';
import healthRouter from './routes/health-check';
import movieRouter from './routes/movies.routes';
import genreRouter from './routes/genres.routes';
import errorHandler from './middleware/errorHandler.middleware';
import Error from './interfaces/error.interface';

const app: Express = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI =
	'mongodb+srv://nosql_prac:LmYvNEGPnOC0RJEc@cluster0.qbcmqku.mongodb.net/test?retryWrites=true&w=majority';

app.use(express.json());

app.get('/', (req: Request, res: Response) =>
	res.send('<a href="/health-check">Health<a>')
);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/health-check', healthRouter);
app.use('/movies', movieRouter);
app.use('/genres', genreRouter);

app.use((_req: Request, _res: Response, _next: NextFunction) => {
	const error: Error = new Error('Not found!');
	error.statusCode = 404;
	throw error;
});

app.use(errorHandler);

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
