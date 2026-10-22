// apps/api/src/index.ts
import express from 'express';
import telemetryRouter from './routes/telemetry.js'; // Ensure the .js suffix is present
// ... rest of express server setup remains unchanged
import { logger } from './utils/logger.js'; // ESM uyumlu import

const app = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

app.set('trust proxy', true);

// Gelen her HTTP isteğini loglayan inline middleware
app.use((req, res, next) => {
  const clientIp = req.headers['x-real-ip'] || req.socket.remoteAddress;
  logger.info({
    method: req.method,
    url: req.url,
    ip: clientIp,
    userAgent: req.headers['user-agent']
  }, `Inbound request received`);
  next();
});

// Rotaları eşleştir
app.use('/telemetry', telemetryRouter);

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Telemetry API Microservice successfully started on port ${PORT}`);
});

