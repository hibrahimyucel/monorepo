// apps/api/src/index.ts
import express from 'express';
import telemetryRouter from './routes/telemetry.js';

const app = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

// Nginx proxy başlıklarına (X-Real-IP) güven
app.set('trust proxy', true);

// Rotaları eşleştir
app.use('/telemetry', telemetryRouter);

// KRİTİK DÜZELTME: '0.0.0.0' ekleyerek Docker içi ağ trafiğine izin veriyoruz
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Telemetry API Microservice running on port ${PORT}`);
});

