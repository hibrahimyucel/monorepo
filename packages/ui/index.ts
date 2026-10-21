// packages/ui/index.ts
// ESM rule: Relative path imports must explicitly target the compiled .js suffix maps

export { renderTelemetryWidget, drawSparkline, renderLogTerminal } from './src/components/TelemetryWidget.js';
export { ReactTelemetryCard } from './src/components/ReactTelemetryCard.js';
export type { ReactTelemetryCardProps } from './src/components/ReactTelemetryCard.js';
export type { TelemetryWidgetProps, MetricStream, LogEntry } from './src/components/TelemetryWidget.js';

