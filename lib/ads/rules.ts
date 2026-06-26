export interface ArticleBlock {
  content?: string;
  imageUrl?: string;
}

export function applyRules(
  positions: number[],
  blocks: ArticleBlock[]
): number[] {
  const result: number[] = [];

  for (let position of positions) {
    let index = position - 1;

    // 超出範圍
    if (index < 0 || index >= blocks.length) {
      continue;
    }

    // 第一段不能放
    if (position <= 1) {
      continue;
    }

    // 最後一段不能放
    if (position >= blocks.length) {
      continue;
    }

    const block = blocks[index];

    // 沒有內容不能放
    if (!block.content?.trim()) {
      continue;
    }

    // 避免重複
    if (!result.includes(position)) {
      result.push(position);
    }
  }

  return result;
}