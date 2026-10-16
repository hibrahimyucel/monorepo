import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), platform: 'AlmaLinux OS' });
});

app.get('/api/v1/data', (req, res) => {
  res.json({
    metrics: { users: 1240, activeSubscriptions: 982, monthlyRecurringRevenue: 14750 },
    systemInfo: { environment: 'production', upstreamProxy: 'Nginx Engine' }
  });
});

app.listen(PORT, () => {
  console.log(`📡 Backend service engine successfully booted on port ${PORT}`);
});
