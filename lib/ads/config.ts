export const ADS_CONFIG = {
  // Block 少於多少字就與下一個 Block 合併
  MERGE_LENGTH: 200,

  // 合併頁第一個 Block 超過多少字，可以在中間插一個廣告
  MERGED_FIRST_BLOCK_AD: 30,

    // 純文字文章
  TEXT_AD_INTERVAL: 400,

  // 從380字開始找切點
  TEXT_AD_SEARCH_START: 380,

  // 最多找到450字
  TEXT_AD_SEARCH_END: 450,
};