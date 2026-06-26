"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ClientAd from "@/app/components/ClientAd";
import { SmartAdEngine } from "@/lib/ads/SmartAdEngine";

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

  const MIN_LENGTH = 200;

  const pages: {
  blocks: any[];
  pageNumber: number;
  firstBlockIndex: number;
}[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const current = blocks[i];

    if (
      current.content?.trim().length < MIN_LENGTH &&
      blocks[i + 1]
    ) {
      pages.push({
  blocks: [current, blocks[i + 1]],
  pageNumber: i + 2,
  firstBlockIndex: i,
});

      i++;
    } else {
      pages.push({
  blocks: [current],
  pageNumber: i + 1,
  firstBlockIndex: i,
});
    }
  }

  const currentPage = pages[page];
  const firstBlockIndex = currentPage.firstBlockIndex;
  const pageBlocks = currentPage.blocks;
  console.log("pageBlocks:", pageBlocks);

  const startPageNumber =
    currentPage.pageNumber -
    pageBlocks.length +
    1;

    const adEngine = SmartAdEngine(blocks);

console.log("========== Smart Ad ==========");

console.log(adEngine);

console.log("positions =", adEngine.positions);

console.log("adCount =", adEngine.adCount);

console.log("firstBlockIndex =", firstBlockIndex);

  

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">

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
    left-2
    top-2
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
     rotate-[22deg]
     rounded-full
    "
  />

  <div
    className="
    w-1.5
    h-5
    md:h-7
    bg-gray-500
    rotate-[22deg]
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

            <div
  className="
    max-w-4xl
    mx-auto
    pl-2
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

            {adEngine.positions.includes(firstBlockIndex + idx + 1) && (
  <div className="mt-8">
    <ClientAd position="article-auto" />
  </div>
)}

          </div>

        </div>
      ))}

      {/* 底部分页 */}
      <div className="flex justify-between items-center mt-8">

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