export interface CalculatePositionOptions {
  totalParagraphs: number;
  adCount: number;
}

export function calculatePositions({
  totalParagraphs,
  adCount,
}: CalculatePositionOptions): number[] {
  if (adCount <= 0) return [];

  const positions: number[] = [];

  const step = totalParagraphs / (adCount + 1);

  for (let i = 1; i <= adCount; i++) {
    positions.push(Math.round(step * i));
  }

  return positions;
}