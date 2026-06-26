export interface PositionOptions {
  totalParagraphs: number;
  adCount: number;
}

export function calculatePositions({
  totalParagraphs,
  adCount,
}: PositionOptions): number[] {
  if (adCount <= 0) return [];

  // 保留第一段與最後一段
  const start = 2;
  const end = totalParagraphs - 1;

  if (end <= start) return [];

  const available = end - start + 1;

  const step = available / (adCount + 1);

  const positions: number[] = [];

  for (let i = 1; i <= adCount; i++) {
    positions.push(
      Math.round(start + step * i)
    );
  }

  return positions;
}