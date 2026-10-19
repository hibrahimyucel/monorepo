import express from 'express';
import cors from 'cors';
import os from 'os';
// Import the cross-workspace utility function natively compiled by Turborepo
import { formatUptime } from '@saas/ui';

const app = express();
const PORT = process.env.PORT || 5000;

app.enable('trust proxy');
app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), platform: 'AlmaLinux OS' });
});

app.get('/api/v1/data', (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown Agent';

  const rawServerUptime = os.uptime();
  const rawProcessUptime = process.uptime();
  const serverTime = new Date();

  res.json({
    metrics: {
      users: 1240,
      activeSubscriptions: 982,
      monthlyRecurringRevenue: 14750
    },
    clientTelemetry: {
      ipAddress: clientIp,
      userAgent: userAgent,
      requestedAt: serverTime.toISOString(),
      epochTimestamp: serverTime.getTime()
    },
    systemEnvironment: {
      hostPlatform: os.platform(),
      kernelArchitecture: os.arch(),
      serverCpuCoreCount: os.cpus().length,
      serverTotalMemoryGB: Math.round(os.totalmem() / (1024 * 1024 * 1024)),
      serverFreeMemoryGB: Math.round(os.freemem() / (1024 * 1024 * 1024)),
      // Process metrics using the shared cross-workspace formatting logic
      apiEngineUptimeFormatted: formatUptime(Math.round(rawProcessUptime)),
      hostSystemUptimeFormatted: formatUptime(Math.round(rawServerUptime)),
      rawMetrics: {
        processSeconds: Math.round(rawProcessUptime),
        systemSeconds: Math.round(rawServerUptime)
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`📡 Advanced Express API engine successfully booted on port ${PORT}`);
});

