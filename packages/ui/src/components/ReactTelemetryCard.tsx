// packages/ui/src/components/ReactTelemetryCard.tsx
import React from 'react';

export interface ReactTelemetryCardProps {
  canvasId: string;
  title: string;
  value: string | number;
  unit: string;
  status: 'nominal' | 'divergent' | 'critical';
}

export function ReactTelemetryCard({ canvasId, title, value, unit, status }: ReactTelemetryCardProps) {
  const statusColors = {
    nominal: 'border-slate-900 hover:border-emerald-500/30',
    divergent: 'border-slate-900 hover:border-amber-500/30',
    critical: 'border-slate-900 hover:border-rose-400/30'
  };

  const dotColors = {
    nominal: 'bg-emerald-400',
    divergent: 'bg-amber-400',
    critical: 'bg-rose-400'
  };

  return (
    <div className={`relative group overflow-hidden bg-slate-950/40 backdrop-blur-xl border rounded-2xl p-6 shadow-2xl transition-all duration-300 ${statusColors[status]}`}>
      {/* Üst Durum Işığı Barı */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-sans">{title}</span>
        <span className="relative flex h-2 w-2">
          {status !== 'nominal' && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[status]}`}></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[status]}`}></span>
        </span>
      </div>

      {/* Büyük Metrik Değeri */}
      <div className="flex items-baseline gap-1 relative z-10 mb-4">
        <span className="text-4xl font-extrabold text-white tracking-tight font-mono">{value}</span>
        <span className="text-sm font-medium text-slate-500 font-sans">{unit}</span>
      </div>

      {/* Sparkline Çizim Alanı */}
      <div className="w-full h-12 mt-2 relative z-10">
        <canvas id={canvasId} className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></canvas>
      </div>
    </div>
  );
}

