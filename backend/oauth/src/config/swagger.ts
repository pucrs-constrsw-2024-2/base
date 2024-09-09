export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OAuth API',
      version: '1.0.0',
      description: 'API documentation for OAuth server',
    },
  },
  apis: ['./src/**/*.ts'],
}
