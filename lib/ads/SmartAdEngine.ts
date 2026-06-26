import { analyzeArticle } from "./analyzeArticle";
import { calculateAdCount } from "./calculateAdCount";
import { calculatePositions } from "./calculatePositions";
import { applyRules } from "./rules";
import { ArticleBlock } from "./calculateAdPositions";

export function SmartAdEngine(
  blocks: ArticleBlock[]
) {
  // ① 分析文章
  const article = analyzeArticle(blocks);

  // ② 算廣告數
  const adCount = calculateAdCount({
    totalChars: article.totalChars,
  });

  // ③ 算平均位置
  const positions = calculatePositions({
    totalParagraphs: article.totalParagraphs,
    adCount,
  });

  // ④ 套用規則
  const finalPositions = applyRules(
    positions,
    blocks
  );

  return {
    ...article,

    adCount,

    positions: finalPositions,
  };
}