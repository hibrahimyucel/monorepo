// packages/ui/src/components/TelemetryCard.ts
// Dikkat: ESM gereği export ve importlarımıza sadık kalıyoruz.

export interface TelemetryCardProps {
  title: string;
  value: string | number;
  status: 'online' | 'warning' | 'critical';
  subtext: string;
}

export function renderTelemetryCard({ title, value, status, subtext }: TelemetryCardProps): string {
  const statusColors = {
    online: 'bg-emerald-500 shadow-emerald-500/20',
    warning: 'bg-amber-500 shadow-amber-500/20',
    critical: 'bg-rose-500 shadow-rose-500/20'
  };

  return `
    <div class="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/50">
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm font-medium text-slate-400 tracking-wide uppercase">${title}</span>
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${statusColors[status]} opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 ${statusColors[status]}"></span>
        </span>
      </div>
      <div class="text-3xl font-bold text-white tracking-tight font-mono">${value}</div>
      <p class="text-xs text-slate-500 mt-2 flex items-center gap-1">${subtext}</p>
    </div>
  `;
}
