import { analyzeArticle } from "./analyzeArticle";
import { calculateAdCount } from "./calculateAdCount";
import { calculatePositions } from "./calculatePositions";
import { calculateImagePositions } from "./calculateImagePositions";
import { ArticleBlock, applyRules } from "./rules";

export function SmartAdEngine(
  blocks: ArticleBlock[]
) {
  // ① 分析文章
  const article = analyzeArticle(blocks);

  const isImageArticle =
  article.hasImage && article.imageRatio >= 0.3;

const isTextArticle =
  !article.hasImage || article.imageRatio < 0.3;

  // ② 算廣告數
  const adCount = calculateAdCount({
    totalChars: article.totalChars,
  });

  // ③ 算平均位置
 let positions: number[];

if (isImageArticle) {
  // 目前先沿用原本演算法，下一步再優化圖片策略
  positions = calculateImagePositions({
    totalParagraphs: article.totalParagraphs,
    adCount,
  });
} else {
  // 純文字文章
  positions = calculatePositions({
    totalParagraphs: article.totalParagraphs,
    adCount,
  });
}

  // ④ 套用規則
  const finalPositions = applyRules(
    positions,
    blocks
  );

  return {
  ...article,

  isImageArticle,
  isTextArticle,

  adCount,

  positions: finalPositions,
};
}