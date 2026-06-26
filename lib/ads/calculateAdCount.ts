export interface ArticleInfo {
  totalChars: number;
}

export function calculateAdCount({
  totalChars,
}: ArticleInfo): number {
  if (totalChars < 1200) return 0;
  if (totalChars < 2200) return 1;
  if (totalChars < 3200) return 2;
  if (totalChars < 4500) return 3;
  if (totalChars < 6000) return 4;
  if (totalChars < 8000) return 5;

  return 6; // 最多 6 個
}