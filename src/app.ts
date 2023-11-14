import express, { Request, Response, Express, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerSpec from './utils/swagger';
import healthRouter from './routes/health-check';
import movieRouter from './routes/movies.routes';
import genreRouter from './routes/genres.routes';
import errorHandler from './middleware/errorHandler.middleware';
import CustomError from './utils/CustomError';

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) =>
	res.send('<a href="/health-check">Health<a>')
);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/health-check', healthRouter);
app.use('/movies', movieRouter);
app.use('/genres', genreRouter);

app.use((_req: Request, _res: Response, _next: NextFunction) => {
	throw new CustomError('Not Found', 404);
});

app.use(errorHandler);

export default app;
