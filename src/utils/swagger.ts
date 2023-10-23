import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const options: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Epam Node js Course',
			version: '1.0.0',
		},
		components: {
			schemas: {
				HealthCheck: {
					type: 'object',
					properties: {
						isRunning: {
							type: 'boolean',
							description: 'Shows whether server is running or not',
						},
					},
					example: {
						isRunning: true,
					},
				},
				Genre: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
							description: 'The name of the genre',
						},
						_id: {
							type: 'string',
							description: 'The unique identifier of the genre',
						},
					},
					example: {
						name: 'comedy',
						_id: '653250a6b81c59abd554d45d',
					},
				},
				GenreBody: {
					type: 'object',
					required: ['name'],
					properties: {
						name: {
							type: 'string',
							description: 'The name of the genre',
						},
					},
					example: {
						name: 'comedy',
					},
				},
			},
			responses: {
				404: {
					description: 'Not Found',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									error: {
										type: 'object',
										properties: {
											statusCode: { type: 'number' },
											message: { type: 'string' },
										},
									},
								},
								example: {
									error: { statusCode: 404, message: 'Not Found' },
								},
							},
						},
					},
				},
				422: {
					description: 'Unprocessable Entity',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									error: {
										type: 'object',
										properties: {
											statusCode: { type: 'number' },
											message: { type: 'string' },
										},
									},
								},
								example: {
									error: { statusCode: 422, message: 'Data validation failed' },
								},
							},
						},
					},
				},
				500: {
					description: 'Internal Server Error',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									error: {
										type: 'object',
										properties: {
											statusCode: { type: 'number' },
											message: { type: 'string' },
										},
									},
								},
								example: {
									error: { statusCode: 500, message: 'Internal Server Error' },
								},
							},
						},
					},
				},
			},
		},

		servers: [
			{ url: 'http://localhost:3000', description: 'Development server' },
		],
	},
	apis: ['./src/app.ts', './src/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
