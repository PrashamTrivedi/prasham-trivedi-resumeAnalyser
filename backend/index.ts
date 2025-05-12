import { Hono } from 'npm:hono@3.11.4';
import { cors } from 'npm:hono@3.11.4/cors';
import { logger } from 'npm:hono@3.11.4/logger';
import { errorHandler } from './middleware/errorHandler';
import resumeRouter from './controllers/resumeController';
import healthRouter from './controllers/healthController';

// Create Hono app
const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

// Unwrap Hono errors to see original error details
app.onError((err, c) => {
  return errorHandler(err, c);
});

// Mount routers
app.route('/', healthRouter);
app.route('/api', resumeRouter);

// Not found handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: {
      message: 'Resource not found',
      code: 'NOT_FOUND',
    }
  }, 404);
});

// This is the entry point for HTTP vals
export default app.fetch;