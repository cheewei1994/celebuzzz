import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  if (totalPages <= 9) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 6, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    "...",
    totalPages,
  ];
}

function getMobilePageNumbers(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  // 5 页以内全部显示
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // 前三页
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  // 最后三页
  if (currentPage >= totalPages - 2) {
    return [
      1,
      "...",
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // 中间
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
const mobilePages = getMobilePageNumbers(
  currentPage,
  totalPages
);

  return (
  <>
    <div className="hidden md:flex flex-wrap justify-center items-center gap-3 mt-10">

      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="w-11 h-11 rounded-lg border border-gray-300 bg-white hover:bg-blue-100 hover:border-blue-400 transition flex items-center justify-center"
        >
           <ChevronLeft size={18} strokeWidth={2.2} />
            </Link>
      ) : (
        <span className="w-11 h-11 rounded-lg border border-gray-200 text-gray-300 opacity-50 cursor-not-allowed flex items-center justify-center">
          <ChevronLeft size={18} strokeWidth={2.2} />
        </span>
      )}

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="w-11 h-11 flex items-center justify-center text-gray-400"
          >
            …
          </span>
        ) : (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={`w-11 h-11 rounded-lg border flex items-center justify-center transition ${
              page === currentPage
                ? "bg-blue-600 text-white border-blue-600 font-semibold shadow-sm"
                : "bg-white border-gray-300 hover:bg-blue-100"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="w-11 h-11 rounded-lg border border-gray-300 bg-white hover:bg-blue-100 hover:border-blue-400 transition flex items-center justify-center"
        >
           <ChevronRight size={18} strokeWidth={2.2} />
        </Link>
      ) : (
        <span className="w-11 h-11 rounded-lg border border-gray-200 text-gray-300 flex items-center justify-center cursor-not-allowed">
          <ChevronRight size={18} strokeWidth={2.2} />
        </span>
      )}
     </div>
{/* Mobile Pagination */}
<div className="flex md:hidden justify-center items-center gap-2 mt-8">

  {/* Previous */}
  {currentPage > 1 ? (
    <Link
      href={`${baseUrl}?page=${currentPage - 1}`}
      className="w-9 h-9 rounded-lg border border-gray-300 bg-white hover:bg-blue-100 hover:border-blue-400 transition flex items-center justify-center"
    >
      <ChevronLeft size={16} />
    </Link>
  ) : (
    <span className="w-9 h-9 rounded-lg border border-gray-200 text-gray-300 opacity-50 cursor-not-allowed flex items-center justify-center">
      <ChevronLeft size={16} />
    </span>
  )}

  {mobilePages.map((page, index) =>
    page === "..." ? (
      <span
        key={`m-${index}`}
        className="w-8 text-center text-gray-400"
      >
        …
      </span>
    ) : (
      <Link
        key={page}
        href={`${baseUrl}?page=${page}`}
        className={`w-9 h-9 rounded-lg border flex items-center justify-center text-sm transition ${
          page === currentPage
            ? "bg-blue-600 text-white border-blue-600 font-semibold"
            : "border-gray-300 bg-white hover:bg-blue-100 hover:border-blue-400"
        }`}
      >
        {page}
      </Link>
    )
  )}

  {/* Next */}
  {currentPage < totalPages ? (
    <Link
      href={`${baseUrl}?page=${currentPage + 1}`}
      className="w-9 h-9 rounded-lg border border-gray-300 bg-white hover:bg-blue-100 hover:border-blue-400 transition flex items-center justify-center"
    >
      <ChevronRight size={16} />
    </Link>
  ) : (
    <span className="w-9 h-9 rounded-lg border border-gray-200 text-gray-300 opacity-50 cursor-not-allowed flex items-center justify-center">
      <ChevronRight size={16} />
    </span>
  )}

</div>
  </>
);
}