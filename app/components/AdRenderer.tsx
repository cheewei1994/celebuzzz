"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdRenderer({
  slot,
  position,
}: {
  code: string;
  slot: string;
  position: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slot || !containerRef.current) return;

    // 清空舊廣告
    containerRef.current.innerHTML = "";

    // 建立新的 ins
    const ins = document.createElement("ins");

    ins.className = "adsbygoogle";

    ins.style.display = "block";

    ins.setAttribute(
      "data-ad-client",
      "ca-pub-5206647366547356"
    );

    ins.setAttribute(
      "data-ad-slot",
      slot
    );

    ins.setAttribute(
      "data-ad-format",
      "auto"
    );

    ins.setAttribute(
      "data-full-width-responsive",
      "true"
    );

    containerRef.current.appendChild(ins);
    
    requestAnimationFrame(() => {
  if (!containerRef.current) return;

  const ins = containerRef.current.querySelector(
    ".adsbygoogle"
  ) as HTMLElement | null;

  if (!ins) return;

  // 已經初始化過，不再 push
  if (ins.getAttribute("data-adsbygoogle-status")) {
    return;
  }

  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});

  } catch (err) {
    console.error(err);
  }
});

    return () => {};
  }, [slot]);

  return (
  <div
  ref={containerRef}
  className={`my-6 ${
    position === "article-auto"
  ? "w-screen md:w-full relative left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0"
  : ""
  }`}
/>
);
}