import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const blocks: string[] = [];

    let title = "";
    let image = "";

    // =====================
    // LuckyElse（services.orgs.live）
    // =====================
    if (url.includes("luckyelse.com")) {
      console.log("LUCKYELSE VIA SERVICES");

      const response = await fetch(
        `https://services.orgs.live/collect/extract?url=${encodeURIComponent(url)}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
            Referer: "https://limte.net/",
          },
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(`Extract failed: ${response.status}`);
      }

      const result = await response.json();

      title = result.data.title || "";
      image = result.data.image || "";

      const $ = cheerio.load(result.data.content || "");

      $(".container").each((_, el) => {
        const imageUrl = $(el).find("img").attr("src") || "";

        let content =
          $(el).find(".text").html() ||
          $(el).clone().find("img").remove().end().html() ||
          "";

        content = content
          // 保留 <br> 換行
          .replace(/<br\s*\/?>/gi, "\n")
          // 段落之間保留一個空白行
          .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
          .replace(/<\/p>/gi, "\n\n")
          .replace(/<p[^>]*>/gi, "")
          // 移除其它 HTML
          .replace(/<[^>]+>/g, "")
          // HTML 空白字元
          .replace(/&nbsp;/gi, " ")
          // 移除頁碼 (1/6、2/6...)
          .replace(/\b\d+\/\d+\b/g, "")
          // 保留空行，只修剪每行尾端空白
          .split("\n")
          .map((line) => line.trimEnd())
          .join("\n")
          // 三個以上空行縮成兩個
          .replace(/\n{3,}/g, "\n\n")
          .trim();

        if (!imageUrl && !content) return;

        blocks.push(
          JSON.stringify({
            imageUrl,
            content,
          }),
        );
      });

      const summary =
        blocks.length > 0 ? JSON.parse(blocks[0]).content.slice(0, 100) : "";

      return NextResponse.json({
        success: true,
        title,
        image,
        blocks,
        summary,
      });
    }

    // =====================
    // NovelBulk（測試）
    // =====================
    else if (url.includes("novelbulk.top")) {
      console.log("NOVELBULK DETECTED");

      for (let page = 1; page <= 50; page++) {
        const pageUrl = page === 1 ? `${url}.html` : `${url}p${page}.html`;

        const response = await fetch(pageUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
          },
        });

        if (!response.ok) break;

        const html = await response.text();
        const $ = cheerio.load(html);

        if (page === 1) {
          title =
            $('meta[property="og:title"]').attr("content") ||
            $("title").text().trim();

          image = $('meta[property="og:image"]').attr("content") || "";
        }

        const containers = $(".detail_imagesView .container");

        containers.each((_, el) => {
          const imageUrl = $(el).find("img").attr("src") || "";

          let content = $(el).clone().find("img").remove().end().html() || "";

          content = content
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<\/p>/gi, "\n\n")
            .replace(/<[^>]+>/g, "")
            .replace(/\b\d+\/\d+\b/g, "")
            .trim();

          if (!imageUrl && !content) return;

          blocks.push(
            JSON.stringify({
              imageUrl,
              content,
            }),
          );
        });
      }

      const summary =
        blocks.length > 0 ? JSON.parse(blocks[0]).content.slice(0, 100) : "";

      return NextResponse.json({
        success: true,
        title,
        image,
        blocks,
        summary,
      });
    }

    // =====================
    // KimiShare
    // =====================
    else if (url.includes("kimishare.org")) {
      console.log("KIMISHARE DETECTED");

      for (let page = 1; page <= 50; page++) {
        const pageUrl = page === 1 ? url : `${url}/page/${page - 1}`;

        const response = await fetch(pageUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
          },
        });

        if (!response.ok) break;

        const html = await response.text();
        const $ = cheerio.load(html);

        if (page === 1) {
          title =
            $('meta[property="og:title"]').attr("content") ||
            $("title").text().trim();

          image =
            $('meta[property="og:image"]').attr("content") ||
            $("#node-content img").first().attr("src") ||
            "";
        }

        const paragraphs = $("#node-content p")
          .map((_, el) => $(el).text().trim())
          .get()
          .filter((p) => p.length > 3);

        const content = paragraphs.join("\n\n");

        if (!content.trim()) continue;

        blocks.push(
          JSON.stringify({
            imageUrl: "",
            content,
          }),
        );
      }

      const summary =
        blocks.length > 0 ? JSON.parse(blocks[0]).content.slice(0, 100) : "";

      return NextResponse.json({
        success: true,
        title,
        image,
        blocks,
        summary,
      });
    }

    // =====================
    // 其它網站
    // =====================

    const seenContents = new Set<string>();

    for (let page = 1; page <= 50; page++) {
      const pageUrl = url.includes("limte.net")
        ? page === 1
          ? url
          : `${url}/page/${page - 1}`
        : url;

      const response = await fetch(pageUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
        },
      });

      if (!response.ok) break;

      const html = await response.text();
      const $ = cheerio.load(html);

      if (page === 1) {
        title =
          $('meta[property="og:title"]').attr("content") ||
          $("title").text().trim();

        image = $('meta[property="og:image"]').attr("content") || "";
      }

      let pageContent = "";

      if (url.includes("limte.net")) {
        pageContent = $("#node-content p")
          .map((_, el) => $(el).text().trim())
          .get()
          .filter(Boolean)
          .join("\n\n");
      } else {
        pageContent = $("article p")
          .map((_, el) => $(el).text().trim())
          .get()
          .filter(Boolean)
          .join("\n\n");
      }

      if (!pageContent) break;

      if (seenContents.has(pageContent)) continue;

      seenContents.add(pageContent);
      blocks.push(pageContent);
    }

    const summary = (blocks[0] || "")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .slice(0, 100);

    return NextResponse.json({
      success: true,
      title,
      image,
      blocks,
      summary,
      count: blocks.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
