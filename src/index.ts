import express, { Request, Response, Express } from 'express';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import healthRouter from './routes/health-check';

const options: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Epam Node js Course',
			version: '1.0.0',
		},
		servers: [
			{ url: 'http://localhost:3000', description: 'Development server' },
		],
	},
	apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);

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
