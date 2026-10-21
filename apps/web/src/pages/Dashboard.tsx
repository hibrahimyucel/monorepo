// apps/web/src/pages/Dashboard.tsx
import React, { useEffect, useState, useRef } from 'react';
import { renderLogTerminal, LogEntry, drawSparkline } from '@saas/ui';

interface TelemetryData {
  systemLoad: string;
  memoryUsage: string;
  networkInterface: string;
  clientRouteIp: string;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<TelemetryData | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: 'React SaaS Engine mounting verified.' }
  ]);
  
  const cpuHistory = useRef<number[]>([]);
  const ramHistory = useRef<number[]>([]);
  const ipHistory = useRef<number[]>([50, 50, 50, 50, 50]); // Sabit IP çizgisi için düz hat havuzu

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

        if (cpuVal > 85) {
          setLogs(prev => [{ timestamp: new Date().toLocaleTimeString(), level: 'CRIT', message: `High CPU Breached: %${cpuVal}` }, ...prev.slice(0, 49)]);
        } else if (Math.random() > 0.8) {
          setLogs(prev => [{ timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: `Telemetry verified for ${data.clientRouteIp}` }, ...prev.slice(0, 49)]);
        }

        // Renk durumlarını kesinleştir
        const cpuStatus = cpuVal > 85 ? 'critical' : cpuVal > 60 ? 'divergent' : 'nominal';
        const ramStatus = ramVal > 90 ? 'critical' : ramVal > 75 ? 'divergent' : 'nominal';
        
        // DOM stabilizasyonu sonrası kesin çizim rotası
        setTimeout(() => {
          drawSparkline('canvas-cpu-react', cpuHistory.current, cpuStatus);
          drawSparkline('canvas-ram-react', ramHistory.current, ramStatus);
          drawSparkline('canvas-ip-react', ipHistory.current, 'nominal'); // Hatalı boş parametre düzeltildi!
        }, 30);

      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return <div className="text-center font-mono py-12 text-slate-500 animate-pulse">[SYNCING] Connecting to saas_api_backend...</div>;
  }

  const cpuVal = parseFloat(metrics.systemLoad);
  const ramVal = parseFloat(metrics.memoryUsage);
  
  const cpuStatus = cpuVal > 85 ? 'critical' : cpuVal > 60 ? 'divergent' : 'nominal';
  const ramStatus = ramVal > 90 ? 'critical' : ramVal > 75 ? 'divergent' : 'nominal';

  // Düzeltilmiş Doğru Tailwind v4 Renk Matrisi (bg-slate-950 kullanıldı)
  const statusColors = {
    nominal: 'border-slate-900 hover:border-emerald-500/30',
    divergent: 'border-slate-900 hover:border-amber-500/30',
    critical: 'border-slate-900 hover:border-rose-400/30'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="dashboard-grid">
        
        {/* CORE LOAD KARTI */}
        <div className={`relative group overflow-hidden bg-slate-950/40 backdrop-blur-xl border rounded-2xl p-6 shadow-2xl transition-all duration-300 ${statusColors[cpuStatus]}`}>
          <div className="flex justify-between items-center mb-4 relative z-10">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-sans">Core Load ({metrics.networkInterface})</span>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${cpuStatus === 'critical' ? 'bg-rose-400' : cpuStatus === 'divergent' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${cpuStatus === 'critical' ? 'bg-rose-400' : cpuStatus === 'divergent' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            </span>
          </div>
          <div className="flex items-baseline gap-1 relative z-10 mb-4">
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">{metrics.systemLoad}</span>
            <span className="text-sm font-medium text-slate-500 font-sans">%</span>
          </div>
          <div className="w-full h-12 mt-2 relative z-10">
            <canvas id="canvas-cpu-react" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></canvas>
          </div>
        </div>

        {/* MEMORY POOL KARTI */}
        <div className={`relative group overflow-hidden bg-slate-950/40 backdrop-blur-xl border rounded-2xl p-6 shadow-2xl transition-all duration-300 ${statusColors[ramStatus]}`}>
          <div className="flex justify-between items-center mb-4 relative z-10">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-sans">Active Memory Pool</span>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${ramStatus === 'critical' ? 'bg-rose-400' : ramStatus === 'divergent' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${ramStatus === 'critical' ? 'bg-rose-400' : ramStatus === 'divergent' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            </span>
          </div>
          <div className="flex items-baseline gap-1 relative z-10 mb-4">
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">{metrics.memoryUsage}</span>
            <span className="text-sm font-medium text-slate-500 font-sans">%</span>
          </div>
          <div className="w-full h-12 mt-2 relative z-10">
            <canvas id="canvas-ram-react" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></canvas>
          </div>
        </div>

        {/* CLIENT ROUTE KARTI */}
        <div className="relative group overflow-hidden bg-slate-950/40 backdrop-blur-xl border border-slate-900 hover:border-indigo-500/30 rounded-2xl p-6 shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-center mb-4 relative z-10">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-sans">Secure Client Route</span>
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
          </div>
          <div className="flex items-baseline gap-1 relative z-10 mb-4">
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">{metrics.clientRouteIp}</span>
            <span className="text-sm font-medium text-slate-500 font-sans">node</span>
          </div>
          <div className="w-full h-12 mt-2 relative z-10">
            <canvas id="canvas-ip-react" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></canvas>
          </div>
        </div>

      </div>

      <div dangerouslySetInnerHTML={{ __html: renderLogTerminal(logs) }} />
    </div>
  );
}

