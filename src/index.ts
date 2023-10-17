import express, { Request, Response, Express } from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerSpec from './utils/swagger';
import healthRouter from './routes/health-check';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) =>
	res.send('<a href="/health-check">Health<a>')
);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/health-check', healthRouter);

app.use(
	(req: Request, res: Response): Response =>
		res.status(404).send('Not Found - 404')
);

app.use(
	(err: Error, req: Request, res: Response): Response =>
		res.status(500).send('Internal Server Error - 500')
);

app.listen(PORT, (): void =>
	console.log(`Server is listening on ${PORT} port`)
);
