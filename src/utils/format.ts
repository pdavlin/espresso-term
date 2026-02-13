export function formatTemp(celsius: number): string {
  return `${celsius.toFixed(1)}\u00B0`;
}

export function formatPressure(bar: number): string {
  return `${bar.toFixed(1)} bar`;
}

export function formatFlow(mlPerSec: number): string {
  return `${mlPerSec.toFixed(1)} ml/s`;
}

export function formatWeight(grams: number): string {
  return `${grams.toFixed(1)}g`;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `${s}s`;
}

export function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
