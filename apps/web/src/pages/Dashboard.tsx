// apps/web/src/pages/Dashboard.tsx
import React, { useEffect, useState, useRef } from 'react';
import { renderLogTerminal, LogEntry, drawSparkline, ReactTelemetryCard } from '@saas/ui';

interface TelemetryData {
  systemLoad: string;
  memoryUsage: string;
  networkInterface: string;
  clientRouteIp: string;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<TelemetryData | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: 'Abstracted React Core components initialized.' }
  ]);
  
  const cpuHistory = useRef<number[]>([]);
  const ramHistory = useRef<number[]>([]);

  // apps/web/src/pages/Dashboard.tsx (Sadece ilgili useEffect içi güncelleniyor)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/telemetry/snapshot');
        if (!res.ok) throw new Error('API offline');
        const data: TelemetryData = await res.json();
        
        setMetrics(data);

        const cpuVal = parseFloat(data.systemLoad);
        const ramVal = parseFloat(data.memoryUsage);
        
        cpuHistory.current.push(cpuVal);
        if (cpuHistory.current.length > 30) cpuHistory.current.shift();
        
        ramHistory.current.push(ramVal);
        if (ramHistory.current.length > 30) ramHistory.current.shift();

        // KONTROLLÜ CANLI LOG AKIŞI (State güncellenirken geçmişi koruyoruz)
  // apps/web/src/pages/Dashboard.tsx içindeki ilgili setLogs alanları

const timestamp = new Date().toLocaleTimeString();

if (cpuVal > 85) {
  setLogs(prev => [
    { 
      timestamp, 
      level: 'CRIT' as const, // as const ekleyerek tipin geniş string olmasını engelliyoruz
      message: `High CPU Load detected on core: %${cpuVal}` 
    },
    ...prev
  ].slice(0, 50));
} else {
  setLogs(prev => [
    { 
      timestamp, 
      level: 'INFO' as const, // as const ekleyerek 'INFO' literal tipine zorluyoruz
      message: `Inbound telemetry packet verified from IP: ${data.clientRouteIp}` 
    },
    ...prev
  ].slice(0, 50));
}


        const cpuStatus = cpuVal > 85 ? 'critical' : cpuVal > 60 ? 'divergent' : 'nominal';
        const ramStatus = ramVal > 90 ? 'critical' : ramVal > 75 ? 'divergent' : 'nominal';
        
        setTimeout(() => {
          drawSparkline('canvas-cpu-react', cpuHistory.current, cpuStatus);
          drawSparkline('canvas-ram-react', ramHistory.current, ramStatus);
          drawSparkline('canvas-ip-react', [], 'nominal');
        }, 30);

      } catch (err) {
        console.error(err);
      }
    }, 3000); // 3 saniyelik periyot

    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return <div className="text-center font-mono py-12 text-slate-500 animate-pulse">[SYNCING] Connecting to telemetry cluster...</div>;
  }

  const cpuVal = parseFloat(metrics.systemLoad);
  const ramVal = parseFloat(metrics.memoryUsage);
  
  const cpuStatus = cpuVal > 85 ? 'critical' : cpuVal > 60 ? 'divergent' : 'nominal';
  const ramStatus = ramVal > 90 ? 'critical' : ramVal > 75 ? 'divergent' : 'nominal';

  return (
    <div className="space-y-6">
      {/* Harika! Ham HTML gitti, yerine kurumsal soyutlanmış React bileşenleri geldi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="dashboard-grid">
        
        <ReactTelemetryCard 
          canvasId="canvas-cpu-react"
          title={`Core Load (${metrics.networkInterface})`}
          value={metrics.systemLoad}
          unit="%"
          status={cpuStatus}
        />

        <ReactTelemetryCard 
          canvasId="canvas-ram-react"
          title="Active Memory Pool"
          value={metrics.memoryUsage}
          unit="%"
          status={ramStatus}
        />

        <ReactTelemetryCard 
          canvasId="canvas-ip-react"
          title="Secure Client Route"
          value={metrics.clientRouteIp}
          unit="node"
          status="nominal"
        />

      </div>

      <div dangerouslySetInnerHTML={{ __html: renderLogTerminal(logs) }} />
    </div>
  );
}

