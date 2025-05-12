import { Hono } from 'npm:hono';

const healthRouter = new Hono();

/**
 * GET /health
 * Health check endpoint to verify API is operational
 */
healthRouter.get('/health', (c) => {
  return c.json({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    service: 'resume-parser-api'
  });
});

export default healthRouter;