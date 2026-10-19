/**
 * Transforms a raw numerical seconds duration string into a highly readable 
 * academic format tracking Days, Hours, Minutes, and Seconds tokens.
 * 
 * @param totalSeconds - Raw uptime duration value in seconds
 * @returns Human-readable structural string mapping chronological deltas
 */
export const formatUptime = (totalSeconds: number): string => {
  if (totalSeconds < 0) return "0s";
  
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
};
