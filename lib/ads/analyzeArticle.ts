import { ArticleBlock } from "./rules";

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
  imageRatio:
  totalImages / Math.max(paragraphs.length, 1),
}