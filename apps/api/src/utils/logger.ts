// apps/api/src/utils/logger.ts
import pino from 'pino';
import path from 'path';

// Docker container içinde monorepo kök dizininden mutlak yol tanımı
const logDirectory = '/app/infra/logs';

const transport = pino.transport({
  targets: [
    {
      target: 'pino-roll',
      options: {
        file: path.join(logDirectory, 'api-backend.log'),
        frequency: 'daily',
        size: '20m',
        mkdir: true,
      },
      level: 'info',
    }
  ],
});

export const logger = pino(transport);

