// apps/api/src/routes/telemetry.ts
import { Router } from 'express';
import os from 'os';

// Tipi açıkça belirterek TS2742 hatasını bypass ediyoruz
const router: Router = Router();

router.get('/snapshot', (req, res) => {
  const clientIp = req.headers['x-real-ip'] || req.socket.remoteAddress;
  
  res.json({
    epoch: Date.now(),
    networkInterface: process.env.SERVER_IFACE || 'eth0',
    systemLoad: os.loadavg()[0].toFixed(2), // single load avg core
    memoryUsage: ((1 - os.freemem() / os.totalmem()) * 100).toFixed(1),
    clientRouteIp: clientIp
  });
});

export default router;

