"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ClientAd from "@/app/components/ClientAd";
import { SmartAdEngine } from "@/lib/ads/SmartAdEngine";
import { ADS_CONFIG } from "@/lib/ads/config";
import { splitTextWithAds } from "@/lib/ads/splitTextWithAds";

export default function ArticleSlider({
  blocks,
  
}: {
  blocks: any[];
}) {
  console.log("ArticleSlider Loaded", Date.now());
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(() => {
  const p = Number(searchParams.get("page"));

  return !isNaN(p) && p > 0
    ? p - 1
    : 0;
});

  useEffect(() => {
  const p = Number(searchParams.get("page"));

  if (!isNaN(p) && p > 0) {
    setPage(p - 1);
  }
}, [searchParams]);

  if (!blocks?.length) {
    return null;
  }


  const pages: {
  blocks: any[];
  pageNumber: number;
  firstBlockIndex: number;
  merged: boolean;
}[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const current = blocks[i];

    if (
      current.content?.trim().length < ADS_CONFIG.MERGE_LENGTH &&
      blocks[i + 1]
    ) {
      pages.push({
  blocks: [current, blocks[i + 1]],
  pageNumber: i + 2,
  firstBlockIndex: i,
  merged: true,
});

      i++;
    } else {
      pages.push({
  blocks: [current],
  pageNumber: i + 1,
  firstBlockIndex: i,
  merged: false,
});
    }
  }

  const currentPage = pages[page];
  const merged = currentPage.merged;
  const firstBlockIndex = currentPage.firstBlockIndex;
  const pageBlocks = currentPage.blocks;
  const firstBlockLength =
  pageBlocks[0]?.content?.trim().length ?? 0;

let pageAdMode: "normal" | "merged" | "merged-split";

if (!merged) {
  pageAdMode = "normal";
} else if (
  firstBlockLength >= ADS_CONFIG.MERGED_FIRST_BLOCK_AD
) {
  pageAdMode = "merged-split";
} else {
  pageAdMode = "merged";
}
  console.log("pageBlocks:", pageBlocks);

  const startPageNumber =
    currentPage.pageNumber -
    pageBlocks.length +
    1;

    const adEngine = SmartAdEngine(blocks);

console.log("========== Smart Ad ==========");

console.log("SmartAdEngine", {
  isImageArticle: adEngine.isImageArticle,
  isTextArticle: adEngine.isTextArticle,
  positions: adEngine.positions,
  adCount: adEngine.adCount,
});

console.log("positions =", adEngine.positions);

console.log("adCount =", adEngine.adCount);

console.log("firstBlockIndex =", firstBlockIndex);

  const textSections = adEngine.isTextArticle
  ? pageBlocks.map((block) => ({
      ...block,
      sections: splitTextWithAds(
        block.content ?? ""
      ),
    }))
  : [];

  return (
  <div className="overflow-visible">


      {pageBlocks.map((block, idx) => (
        <div key={idx}>

          {/* 图片 */}
{block.imageUrl && (
  <img
    src={block.imageUrl}
    alt=""
    className="w-full"
  />
)}

          {/* 内容 */}
          <div className="relative px-3 md:px-8 pt-6 pb-4">

  {/* 红色标记 */}
<div
  className="
    absolute
    left-1
    top-3
    md:left-4
    md:top-4
    flex
    items-center
    gap-2
  "
>
  <div
    className="
     w-1.5
     h-6
     md:h-8
     bg-red-500
     rotate-[26deg]
     rounded-full
    "
  />

  <div
    className="
    w-1.5
    h-5
    md:h-7
    bg-gray-500
    rotate-[28deg]
    rounded-full
    -mt-1
    "
  />
</div>

            {/* 区块页码 */}
           <div
  className="
    absolute
    right-0
    top-2
    md:right-4
    md:top-4
    bg-transparent
    px-2
    py-1
    text-base
    md:text-xl
    font-bold
    text-gray-700
  "
>
              <span>{startPageNumber + idx}</span>

              <span className="relative -top-0.5 mx-[1px] text-gray-700">
                /
              </span>

              <span>{blocks.length}</span>
            </div>

            {adEngine.isTextArticle ? (

  textSections[idx].sections.map(
  (
    section: {
      text: string;
      hasAdBefore: boolean;
    },
    sectionIndex: number
  ) => (
      <div key={sectionIndex}>

        {section.hasAdBefore && (
  <div className="my-6">
    <ClientAd position="article-auto" />
  </div>
)}

        <div
          className="
            max-w-4xl
            mx-auto
            pl-4
            pr-2
            md:pl-8
            md:pr-8
            whitespace-pre-line
            text-[20px]
            md:text-[22px]
            font-semibold
            leading-9
            md:leading-9
            text-gray-800
          "
        >
          {section.text}
        </div>

      </div>
    )
  )

) : (

  <div
    className="
      max-w-4xl
      mx-auto
      pl-4
      pr-2
      md:pl-8
      md:pr-8
      whitespace-pre-line
      text-[20px]
      md:text-[22px]
      font-semibold
      leading-9
      md:leading-9
      text-gray-800
    "
  >
    {block.content}
  </div>

)}

            {/* 圖文文章：每個 Block 後都放廣告 */}
{adEngine.isImageArticle &&
 pageAdMode === "normal" && (
  <div className="mt-8">
    <ClientAd position="article-auto" />
  </div>
)}

{/* 圖文文章：合併頁第一個 Block 後插廣告 */}
{adEngine.isImageArticle &&
  pageAdMode === "merged-split" &&
  idx === 0 && (
    <div className="mt-8">
      <ClientAd position="article-auto" />
    </div>
)}

{/* 圖文文章：合併頁最後一個 Block 後放廣告 */}
{adEngine.isImageArticle &&
  (pageAdMode === "merged" ||
    pageAdMode === "merged-split") &&
  idx === pageBlocks.length - 1 && (
    <div className="mt-8">
      <ClientAd position="article-auto" />
    </div>
)}
          </div>

        </div>
      ))}

      {/* 底部分页 */}
      <div className="-mx-3 md:mx-0 flex justify-between items-center mt-8">

        <button
          disabled={page === 0}
          onClick={() => {
   window.location.href = `?page=${page}`;
}}
           className={`
    ${
      page === 0
        ? "bg-gray-500"
        : "bg-blue-600"
    }
    text-white
    text-base md:text-xl
    w-28 md:w-38
    h-12 md:h-16
    rounded-r-full
    rounded-l-md
  `}
>
          上一頁
        </button>

        <div className="text-2xl md:text-4xl font-light">
          <span className="text-red-500 relative -top-1">
            {currentPage.pageNumber}
          </span>

          <span className="text-black">
            /{blocks.length}
          </span>
        </div>

        <button
          disabled={page === pages.length - 1}
          onClick={() => {
  window.location.href = `?page=${page + 2}`;
}}
          className={`
    ${
      page === pages.length - 1
        ? "bg-gray-500"
        : "bg-blue-600"
    }
    text-white
    text-base md:text-xl
    w-28 md:w-38
    h-12 md:h-16
    rounded-l-full
    rounded-r-md
  `}
>
          下一頁
        </button>

      </div>

    </div>
  );
}