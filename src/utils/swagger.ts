import swaggerJSDoc, { Options } from 'swagger-jsdoc';

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

export default swaggerSpec;
