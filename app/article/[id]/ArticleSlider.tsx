"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ArticleSlider({
  blocks,
}: {
  blocks: any[];
}) {
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
      });

      i++;
    } else {
      pages.push({
        blocks: [current],
        pageNumber: i + 1,
      });
    }
  }

  const currentPage = pages[page];
  const pageBlocks = currentPage.blocks;

  const startPageNumber =
    currentPage.pageNumber -
    pageBlocks.length +
    1;

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
          <div className="relative px-8 py-4">

            {/* 红色标记 */}
            <div className="absolute left-4 top-4 flex items-center">
              <span className="text-red-500 text-5xl font-black leading-none">
                /
              </span>

              <span className="text-gray-400 text-5xl font-black leading-none -ml-1">
                /
              </span>
            </div>

            {/* 区块页码 */}
            <div className="absolute right-4 top-4 text-lg text-gray-700">
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
                pl-8
                pr-8
                whitespace-pre-line
                text-[22px]
                font-semibold
                leading-9
                text-gray-800
              "
            >
              {block.content}
            </div>

          </div>

        </div>
      ))}

      {/* 底部分页 */}
      <div className="flex justify-between items-center mt-8">

        <button
          disabled={page === 0}
          onClick={() => {
  router.push(`?page=${page}`);
}}
          className="
            bg-gray-500
            text-white text-xl
            w-40
            h-18
            rounded-r-full
            rounded-l-md
            disabled:opacity-50
          "
        >
          上一頁
        </button>

        <div className="text-5xl font-light">
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
  router.push(`?page=${page + 2}`);
}}
          className="
            bg-blue-600
            text-white text-xl
            w-40
            h-18
            rounded-l-full
            rounded-r-md
            disabled:opacity-50
          "
        >
          下一頁
        </button>

      </div>

    </div>
  );
}