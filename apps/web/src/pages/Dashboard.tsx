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
    { timestamp: new Date().toLocaleTimeString(), level: 'INFO' as const, message: 'React EventSource pipeline active.' }
  ]);
  
  const cpuHistory = useRef<number[]>([]);
  const ramHistory = useRef<number[]>([]);

  useEffect(() => {
    // Connect to our new server-sent event route pipeline via Nginx proxy
    const eventSource = new EventSource('/api/telemetry/stream');

    eventSource.onmessage = (event) => {
      try {
        const rawData = JSON.parse(event.data);
        
        // Skip handshake notification payloads
        if (rawData.message === 'SSE_CONNECTED') {
          setLogs(prev => [{ timestamp: new Date().toLocaleTimeString(), level: 'INFO' as const, message: `Real-time cluster stream handshake complete on ${rawData.interface}` }, ...prev].slice(0, 50));
          return;
        }

        const data = rawData as TelemetryData;
        setMetrics(data);

        const cpuVal = parseFloat(data.systemLoad);
        const ramVal = parseFloat(data.memoryUsage);
        
        cpuHistory.current.push(cpuVal);
        if (cpuHistory.current.length > 30) cpuHistory.current.shift();
        
        ramHistory.current.push(ramVal);
        if (ramHistory.current.length > 30) ramHistory.current.shift();

        const timestamp = new Date().toLocaleTimeString();
        if (cpuVal > 85) {
          setLogs(prev => [{ timestamp, level: 'CRIT' as const, message: `SSE Trigger - Extreme Load: %${cpuVal}` }, ...prev].slice(0, 50));
        } else {
          setLogs(prev => [{ timestamp, level: 'INFO' as const, message: `SSE Packet processed cleanly from server node interface.` }, ...prev].slice(0, 50));
        }

        const cpuStatus = cpuVal > 85 ? 'critical' : cpuVal > 60 ? 'divergent' : 'nominal';
        const ramStatus = ramVal > 90 ? 'critical' : ramVal > 75 ? 'divergent' : 'nominal';
        
        setTimeout(() => {
          drawSparkline('canvas-cpu-react', cpuHistory.current, cpuStatus);
          drawSparkline('canvas-ram-react', ramHistory.current, ramStatus);
          drawSparkline('canvas-ip-react', [], 'nominal');
        }, 30);

      } catch (err) {
        console.error('Failed to parse SSE payload:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('EventSource encountered connection breakdown:', err);
      setLogs(prev => [{ timestamp: new Date().toLocaleTimeString(), level: 'WARN' as const, message: 'SSE disconnected. Nginx fallback pipeline retrying...' }, ...prev].slice(0, 50));
    };

    // Clean up connections on unmount
    return () => {
      eventSource.close();
    };
  }, []);

  if (!metrics) {
    return <div className="text-center font-mono py-12 text-slate-500 animate-pulse">[ESTABLISHING STREAM] Listening to server sent channel...</div>;
  }

  const cpuVal = parseFloat(metrics.systemLoad);
  const ramVal = parseFloat(metrics.memoryUsage);
  const cpuStatus = cpuVal > 85 ? 'critical' : cpuVal > 60 ? 'divergent' : 'nominal';
  const ramStatus = ramVal > 90 ? 'critical' : ramVal > 75 ? 'divergent' : 'nominal';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="dashboard-grid">
        <ReactTelemetryCard canvasId="canvas-cpu-react" title={`Core Load (${metrics.networkInterface})`} value={metrics.systemLoad} unit="%" status={cpuStatus} />
        <ReactTelemetryCard canvasId="canvas-ram-react" title="Active Memory Pool" value={metrics.memoryUsage} unit="%" status={ramStatus} />
        <ReactTelemetryCard canvasId="canvas-ip-react" title="Secure Client Route" value={metrics.clientRouteIp} unit="node" status="nominal" />
      </div>
      <div dangerouslySetInnerHTML={{ __html: renderLogTerminal(logs) }} />
    </div>
  );
}

