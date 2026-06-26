export interface ArticleBlock {
  content?: string;
  imageUrl?: string;
}

export interface AdPositionOptions {
  blocks: ArticleBlock[];

  /** 每多少字插入一個廣告 */
  charsPerAd?: number;

  /** 第一個廣告至少第幾段後 */
  firstAfter?: number;

  /** 最後保留幾段 */
  lastReserve?: number;

  /** 最大廣告數 */
  maxAds?: number;
}

export function calculateAdPositions({
  blocks,
  charsPerAd = 1000,
  firstAfter = 3,
  lastReserve = 2,
  maxAds = 8,
}: AdPositionOptions): number[] {
  const paragraphs = blocks.filter(
    (b) => (b.content ?? "").trim().length > 0
  );

  if (paragraphs.length === 0) return [];

  // 全文字數
  const totalChars = paragraphs.reduce(
    (sum, block) => sum + (block.content?.trim().length ?? 0),
    0
  );

  // 廣告數量
  let adCount = Math.floor(totalChars / charsPerAd);

  adCount = Math.max(0, Math.min(adCount, maxAds));

  if (adCount === 0) return [];

  const start = firstAfter;
  const end = paragraphs.length - lastReserve;

  if (end <= start) return [];

  const positions: number[] = [];

  const available = end - start + 1;

  const step = available / (adCount + 1);

  for (let i = 1; i <= adCount; i++) {
    positions.push(Math.round(start + step * i));
  }

  return positions;
}