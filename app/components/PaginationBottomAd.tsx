"use client";

import ClientAd from "./ClientAd";

export default function PaginationBottomAd() {
  console.log("PaginationBottomAd Loaded");

  return (
    <div className="my-8 border border-red-500">
      <ClientAd position="article-pagination-bottom" />
    </div>
  );
}