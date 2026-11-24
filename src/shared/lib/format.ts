export function formatDuration(sec: number): string {
  const m = Math.round(sec / 60);
  const h = Math.floor(m / 60),
    r = m % 60;
  if (h === 0) return `${r} мин`;
  return r === 0 ? `${h} ч` : `${h} ч ${r} мин`;
}
export const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
