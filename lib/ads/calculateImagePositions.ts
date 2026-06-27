export interface ImagePositionOptions {
  totalParagraphs: number;
  adCount: number;
}

export function calculateImagePositions({
  totalParagraphs,
  adCount,
}: ImagePositionOptions): number[] {
  if (adCount <= 0) return [];

  // 圖文文章至少要有 4 個 block 才開始插廣告
  if (totalParagraphs < 4) return [];

  const positions: number[] = [];

  // 第一個廣告放在第 3 個 block 後
  let current = 3;

  while (
    current < totalParagraphs &&
    positions.length < adCount
  ) {
    positions.push(current);

    // 每隔 3 個 block 插一次
    current += 3;
  }

  return positions;
}