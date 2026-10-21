// apps/web/src/main.ts
import './index.css';
import { renderTelemetryWidget, drawSparkline, renderLogTerminal, LogEntry } from '@saas/ui';

const dashboardGrid = document.getElementById('dashboard-grid');

const telemetryHistory = { cpu: [] as number[], ram: [] as number[] };
const liveLogs: LogEntry[] = []; // Hafızadaki canlı loglar
const MAX_HISTORY_POINTS = 30;

function pushLog(level: 'INFO' | 'WARN' | 'CRIT', message: string) {
  const timeStr = new Date().toLocaleTimeString();
  liveLogs.unshift({ timestamp: timeStr, level, message }); // Yeni logu başa ekle
  if (liveLogs.length > 50) liveLogs.pop(); // Max 50 log tut
}

interface TelemetrySnapshot {
  systemLoad: string;
  memoryUsage: string;
  networkInterface: string;
  clientRouteIp: string;
}

// Başlangıç Logu
pushLog('INFO', 'SaaS Telemetry Core Engine başlatıldı. İş hattı aktif.');

async function updateDashboardWithLogs() {
  if (!dashboardGrid) return;

  try {
    const response = await fetch('/api/telemetry/snapshot');
    if (!response.ok) throw new Error('API hatası');
    const data: TelemetrySnapshot = await response.json();

    const cpuVal = parseFloat(data.systemLoad);
    const ramVal = parseFloat(data.memoryUsage);

    telemetryHistory.cpu.push(cpuVal);
    if (telemetryHistory.cpu.length > MAX_HISTORY_POINTS) telemetryHistory.cpu.shift();

    telemetryHistory.ram.push(ramVal);
    if (telemetryHistory.ram.length > MAX_HISTORY_POINTS) telemetryHistory.ram.shift();

    const cpuStatus = cpuVal > 85 ? 'critical' : cpuVal > 60 ? 'divergent' : 'nominal';
    const ramStatus = ramVal > 90 ? 'critical' : ramVal > 75 ? 'divergent' : 'nominal';

    // Rastgele aralıklarla sistem logu simüle et veya metrik eşiklerine göre log bas
    if (cpuStatus === 'critical') pushLog('CRIT', `Yüksek yük uyarısı! CPU: %${cpuVal} sınır eşiğini aştı.`);
    else if (Math.random() > 0.7) {
      pushLog('INFO', `Inbound packet route verified from context IP: ${data.clientRouteIp}`);
    }

    // 1. Grid İçeriğini Bas (Kartlar + Terminal)
    dashboardGrid.innerHTML = `
      ${renderTelemetryWidget({
        id: 'cpu-widget',
        title: `Core Load (\${data.networkInterface})`,
        metric: { label: 'CPU', value: data.systemLoad, unit: '%' },
        status: cpuStatus
      })}
      ${renderTelemetryWidget({
        id: 'ram-widget',
        title: 'Active Memory Pool',
        metric: { label: 'RAM', value: data.memoryUsage, unit: '%' },
        status: ramStatus
      })}
      ${renderTelemetryWidget({
        id: 'ip-widget',
        title: 'Network Terminal',
        metric: { label: 'IP', value: data.clientRouteIp, unit: 'node' },
        status: 'nominal'
      })}
      
      <!-- Yeni Eklenen Canlı Terminal -->
      ${renderLogTerminal(liveLogs)}
    `;

    // 2. Grafikleri Çiz
    drawSparkline('canvas-cpu-widget', telemetryHistory.cpu, cpuStatus);
    drawSparkline('canvas-ram-widget', telemetryHistory.ram, ramStatus);
    drawSparkline('canvas-ip-widget', [50, 50, 50, 50, 50], 'nominal');

  } catch (error) {
    console.error(error);
  }
}

setInterval(updateDashboardWithLogs, 1000);
updateDashboardWithLogs();

