// packages/ui/src/components/TelemetryWidget.ts

export interface MetricStream {
  label: string;
  value: string | number;
  unit: string;
  history?: number[]; // Son 30 saniyenin veri geçmişi
}

export interface TelemetryWidgetProps {
  id: string;
  title: string;
  metric: MetricStream;
  status: 'nominal' | 'divergent' | 'critical';
}

// Kartın HTML İskeleti
export function renderTelemetryWidget(props: TelemetryWidgetProps): string {
  const { id, title, metric, status } = props;
  
  const statusConfig = {
    nominal: { border: 'hover:border-emerald-500/30', dot: 'bg-emerald-400' },
    divergent: { border: 'hover:border-amber-500/30', dot: 'bg-amber-400' },
    critical: { border: 'hover:border-rose-400/30', dot: 'bg-rose-400' }
  };

  const activeStatus = statusConfig[status] || statusConfig.nominal;

  return `
    <div class="relative group overflow-hidden bg-slate-950/40 backdrop-blur-xl border border-slate-900 rounded-2xl p-6 shadow-2xl transition-all duration-300 ${activeStatus.border}">
      <div class="flex justify-between items-center mb-4 relative z-10">
        <span class="text-xs font-semibold tracking-wider text-slate-400 uppercase font-sans">${title}</span>
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${activeStatus.dot} opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 ${activeStatus.dot}"></span>
        </span>
      </div>

      <div class="flex items-baseline gap-1 relative z-10 mb-4">
        <span class="text-4xl font-extrabold text-white tracking-tight font-mono">${metric.value}</span>
        <span class="text-sm font-medium text-slate-500 font-sans">${metric.unit}</span>
      </div>

      <!-- Sparkline Canvas Alanı -->
      <div class="w-full h-12 mt-2 relative z-10">
        <canvas id="canvas-${id}" class="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></canvas>
      </div>
    </div>
  `;
}

// Canvas üzerine neon çizgi çizen yüksek performanslı motor
export function drawSparkline(canvasId: string, history: number[], status: 'nominal' | 'divergent' | 'critical') {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas || history.length < 2) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Retina/HD ekranlar için pixel ratio sabitlemesi
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;

  ctx.clearRect(0, 0, width, height);

  // Renk Paleti (Neon Efektleri)
  const colors = {
    nominal: { line: '#34d399', glow: 'rgba(52, 211, 153, 0.15)' },
    divergent: { line: '#fbbf24', glow: 'rgba(251, 191, 36, 0.15)' },
    critical: { line: '#f87171', glow: 'rgba(248, 113, 113, 0.15)' }
  };
  const activeColor = colors[status] || colors.nominal;

  // Çizim Noktalarını Hesaplama
  const maxVal = Math.max(...history, 100); // %100 ölçek taban alınır
  const minVal = 0;
  const range = maxVal - minVal;

  ctx.beginPath();
  for (let i = 0; i < history.length; i++) {
    const x = (i / (history.length - 1)) * width;
    const y = height - ((history[i] - minVal) / range) * height + 2; // Alttan taşmayı önlemek için +2
    
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  // Neon Çizgi Stili
  ctx.strokeStyle = activeColor.line;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Gölge/Parlama Efekti
  ctx.shadowBlur = 6;
  ctx.shadowColor = activeColor.line;
  ctx.stroke();
  
  // Gölgeyi kapatıp alt alanı gradyanla doldurma
  ctx.shadowBlur = 0;
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, activeColor.glow);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fill();
}
// packages/ui/src/components/TelemetryWidget.ts dosyasına ekleyin

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'CRIT';
  message: string;
}

// packages/ui/src/components/TelemetryWidget.ts

export function renderLogTerminal(logs: LogEntry[]): string {
  const levelColors = {
    INFO: 'text-sky-400',
    WARN: 'text-amber-400 font-bold',
    CRIT: 'text-rose-500 font-bold animate-pulse'
  };

  // block ve w-full ekleyerek her satırın tam genişlik kaplamasını garanti ediyoruz
  const logLines = logs.map(log => {
    const color = levelColors[log.level] || 'text-slate-300';
    return `
      <div class="block w-full py-1 border-b border-slate-900/50 hover:bg-slate-900/30 px-2 rounded font-mono text-xs clear-both">
        <div class="flex items-start gap-4">
          <span class="text-slate-600 select-none shrink-0">${log.timestamp}</span>
          <span class="${color} w-12 select-none shrink-0">[${log.level}]</span>
          <span class="text-slate-300 flex-1 break-all whitespace-pre-wrap">${log.message}</span>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="col-span-1 md:col-span-3 bg-slate-950/60 backdrop-blur-xl border border-slate-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden mt-6 clear-both block w-full">
      <!-- Terminal Header -->
      <div class="flex items-center justify-between border-b border-slate-900 pb-3 mb-4 w-full">
        <div class="flex items-center gap-2">
          <div class="flex gap-1.5">
            <span class="w-3 h-3 rounded-full bg-rose-500/70 inline-block"></span>
            <span class="w-3 h-3 rounded-full bg-amber-500/70 inline-block"></span>
            <span class="w-3 h-3 rounded-full bg-emerald-500/70 inline-block"></span>
          </div>
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans ml-2">Live Stream Security & Event Logs</span>
        </div>
        <span class="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase animate-pulse">Streaming</span>
      </div>

      <!-- Terminal Body: flex-col ile kesinlikle alt alta dizilimi zorluyoruz -->
      <div class="h-48 overflow-y-auto flex-col gap-1 pr-2 text-left w-full align-top" id="terminal-body-scroll">
        ${logLines.length > 0 ? logLines : '<div class="text-slate-600 font-mono text-xs text-center py-8">No events queued...</div>'}
      </div>
    </div>
  `;
}

