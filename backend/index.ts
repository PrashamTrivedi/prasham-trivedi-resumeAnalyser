import {OpenAPIHono} from 'npm:@hono/zod-openapi'
import {cors} from 'npm:hono/cors'
import {logger} from 'npm:hono/logger'
import {swaggerUI} from 'npm:@hono/swagger-ui'
import {errorHandler} from './middleware/errorHandler.ts'
import resumeRouter from './controllers/resumeController.ts'
import healthRouter from './controllers/healthController.ts'

// Create OpenAPIHono app
const app = new OpenAPIHono()

// Global middleware
app.use('*', logger())
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

// Unwrap Hono errors to see original error details
app.onError((err, c) => {
  return errorHandler(err, c)
})

// Mount routers
app.route('/', healthRouter)
app.route('/api', resumeRouter)

// OpenAPI documentation
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'Resume Parser API',
    version: '1.0.0',
    description: 'API for parsing resumes and extracting structured data with confidence scoring'
  },
  servers: [
    {
      url: 'https://prashamhtrivedi-resumeparser.val.run',
      description: 'Resume Praser APIs'
    }
  ]
})

// Use the middleware to serve Swagger UI at /api-doc
app.get('/api-doc', swaggerUI({url: '/doc'}))

// Not found handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: {
      message: 'Resource not found',
      code: 'NOT_FOUND',
    }
  }, 404)
})

// This is the entry point for HTTP vals
export default app.fetch