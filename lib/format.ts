export function kronor(value: number) {
  const formatted = new Intl.NumberFormat("sv-SE", {
    maximumFractionDigits: 0,
  }).format(value);
  return `${formatted} kr`;
}

export function clampCount(value: number, max = 5000) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(max, Math.round(value)));
}

export function plural(count: number, one: string, many: string) {
  return count === 1 ? one : many;
}
