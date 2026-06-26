"use client";

import { useEffect, useRef } from "react";

export default function AdRenderer({
  code,
  slot,
}: {
  code: string;
  slot: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !slot) return;

    // 每次重新建立廣告容器
    ref.current.innerHTML = `
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-5206647366547356"
        data-ad-slot="${slot}"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    `;

    // 等 DOM 建立完成後再初始化
    setTimeout(() => {
      try {
        (window as any).adsbygoogle =
          (window as any).adsbygoogle || [];

        (window as any).adsbygoogle.push({});
      } catch (err) {
        console.error("AdSense Error:", err);
      }
    }, 100);
  }, [slot]);

  return (
    <div
      ref={ref}
      className="my-6"
    />
  );
}