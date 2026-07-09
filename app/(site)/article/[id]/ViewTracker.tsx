"use client";

import { useEffect } from "react";

export default function ViewTracker({
  articleId,
}: {
  articleId: number;
}) {
  useEffect(() => {
    fetch("/api/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId,
      }),
    }).catch(() => {});
  }, [articleId]);

  return null;
}