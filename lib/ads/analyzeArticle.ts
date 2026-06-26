import { ArticleBlock } from "./calculateAdPositions";

export function analyzeArticle(blocks: ArticleBlock[]) {
  const paragraphs = blocks.filter(
    (b) => (b.content ?? "").trim().length > 0
  );

  const totalChars = paragraphs.reduce(
    (sum, block) => sum + (block.content?.trim().length ?? 0),
    0
  );

  const totalImages = blocks.filter(
    (b) => !!b.imageUrl
  ).length;

  return {
    totalChars,
    totalParagraphs: paragraphs.length,
    totalImages,
    hasImage: totalImages > 0,
  };
}