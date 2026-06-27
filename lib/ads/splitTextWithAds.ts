import { ADS_CONFIG } from "./config";

export interface TextSection {
  text: string;
  hasAdBefore: boolean;
}

function findBestSplitPosition(
  text: string,
  start: number
) {
  const searchStart = Math.min(
    start + ADS_CONFIG.TEXT_AD_SEARCH_START,
    text.length
  );

  const searchEnd = Math.min(
    start + ADS_CONFIG.TEXT_AD_SEARCH_END,
    text.length
  );

  for (let i = searchStart; i < searchEnd; i++) {
    const char = text[i];

    if (
      char === "。" ||
      char === "！" ||
      char === "？" ||
      char === "\n"
    ) {
      return i + 1;
    }
  }

  return searchEnd;
}

export function splitTextWithAds(
  content: string
): TextSection[] {
  const text = content.trim();

  if (!text) {
    return [];
  }

  const sections: TextSection[] = [];

  let start = 0;

  while (start < text.length) {
    const end = findBestSplitPosition(
  text,
  start
);

    sections.push({
      text: text.slice(start, end),
      hasAdBefore: true,
    });

    start = end;
  }

  return sections;
}