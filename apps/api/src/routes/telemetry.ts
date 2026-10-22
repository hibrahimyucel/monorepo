// apps/api/src/routes/telemetry.ts
import { Router, Request, Response } from 'express';
import os from 'os';
import { logger } from '../utils/logger.js';

const router: Router = Router();

// 1. Regular short-polling snapshot checkpoint endpoint
router.get('/snapshot', (req: Request, res: Response) => {
  const clientIp = req.headers['x-real-ip'] || req.socket.remoteAddress;
  res.json({
    epoch: Date.now(),
    networkInterface: process.env.SERVER_IFACE || 'eth0',
    systemLoad: os.loadavg()[0].toFixed(2), // Fixed array extract load core array
    memoryUsage: ((1 - os.freemem() / os.totalmem()) * 100).toFixed(1),
    clientRouteIp: clientIp
  });
});

// 2. Real-Time Server-Sent Events (SSE) Route Pipeline (Rate limit bypass target)
router.get('/stream', (req: Request, res: Response) => {
  const clientIp = req.headers['x-real-ip'] || req.socket.remoteAddress;

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no' // Instruct Nginx to bypass active response proxy slicing buffers
  });

  // Push instant successful streaming connect handshake acknowledgement frame
  res.write(`data: ${JSON.stringify({ message: 'SSE_CONNECTED', interface: process.env.SERVER_IFACE || 'eth0' })}\n\n`);
  if (typeof (res as any).flush === 'function') (res as any).flush();

  const streamInterval = setInterval(() => {
    const payload = {
      epoch: Date.now(),
      networkInterface: process.env.SERVER_IFACE || 'eth0',
      systemLoad: os.loadavg()[0].toFixed(2),
      memoryUsage: ((1 - os.freemem() / os.totalmem()) * 100).toFixed(1),
      clientRouteIp: clientIp
    };

    res.write(`data: ${JSON.stringify(payload)}\n\n`);
    if (typeof (res as any).flush === 'function') (res as any).flush();
  }, 2000); // 2-second streaming updates

  req.on('close', () => {
    clearInterval(streamInterval);
    res.end();
  });
});

// Resolves TS1192 error cleanly
export default router;

