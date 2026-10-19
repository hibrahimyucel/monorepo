import express from 'express';
import cors from 'cors';
import os from 'os';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Express to parse and trust upstream Nginx proxy headers (X-Forwarded-For)
app.enable('trust proxy');

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), platform: 'AlmaLinux OS' });
});

app.get('/api/v1/data', (req, res) => {
  // Capture client network telemetry metrics securely
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown Agent';

  // Compute runtime architecture and host server system uptime parameters
  const serverUptimeSeconds = os.uptime();
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
      apiEngineUptimeSeconds: Math.round(process.uptime()),
      hostSystemUptimeSeconds: Math.round(serverUptimeSeconds)
    }
  });
});

app.listen(PORT, () => {
  console.log(`📡 Advanced Express API engine successfully booted on port ${PORT}`);
});
