import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const blocks: string[] = [];

    let title = "";
    let image = "";

    // =====================
    // LuckyElse
    // =====================
    if (url.includes("luckyelse.com")) {
      console.log("LUCKYELSE DETECTED");

      for (let page = 1; page <= 50; page++) {
        const pageUrl = page === 1 ? `${url}.html` : `${url}p${page}.html`;

        console.log("FETCH =", pageUrl);

        const workerUrl =
          "https://luckyelse-worker.cheewei3388.workers.dev?url=" +
          encodeURIComponent(pageUrl);

        const response = await fetch(workerUrl);

        if (!response.ok) {
          break;
        }

        const html = await response.text();

        const $ = cheerio.load(html);

        if (page === 1) {
          title =
            $('meta[property="og:title"]').attr("content") ||
            $("title").text().trim();

          image = $('meta[property="og:image"]').attr("content") || "";
        }

        const containers = $(".detail_imagesView .container");

        console.log("PAGE", page, "CONTAINERS", containers.length);

        containers.each((_, el) => {
          const imageUrl = $(el).find("img").attr("src") || "";

          let content = $(el).clone().find("img").remove().end().html() || "";

          content = content
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<\/p>/gi, "\n\n")
            .replace(/<[^>]+>/g, "")
            .replace(/\b\d+\/\d+\b/g, "")
            .trim();

          if (!imageUrl && !content) {
            return;
          }

          blocks.push(
            JSON.stringify({
              imageUrl,
              content,
            }),
          );
        });
      }

      console.log("FINAL BLOCKS =", blocks.length);

      const summary =
        blocks.length > 0
          ? JSON.parse(blocks[0])
              .content?.replace(/\n/g, " ")
              ?.replace(/\s+/g, " ")
              ?.slice(0, 100)
          : "";

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

        console.log("FETCH =", pageUrl);

        const response = await fetch(pageUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
          },
        });

        console.log("STATUS =", response.status);

        if (!response.ok) {
          break;
        }

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

        if (!content.trim()) {
          console.log("EMPTY PAGE =", page);
          continue;
        }

        console.log("PAGE", page, "PARAGRAPHS", paragraphs.length);

        blocks.push(
          JSON.stringify({
            imageUrl: "",
            content,
          }),
        );
      }

      console.log("FINAL BLOCKS =", blocks.length);

      const summary =
        blocks.length > 0
          ? JSON.parse(blocks[0])
              .content?.replace(/\n/g, " ")
              ?.replace(/\s+/g, " ")
              ?.slice(0, 100)
          : "";

      return NextResponse.json({
        success: true,
        title,
        image,
        blocks,
        summary,
      });
    }

    // =====================
    // 其它网站
    // =====================

    const seenContents = new Set<string>();

    for (let page = 1; page <= 50; page++) {
      let pageUrl = "";

      if (url.includes("limte.net")) {
        pageUrl = page === 1 ? url : `${url}/page/${page - 1}`;
      } else {
        pageUrl = url;
      }

      console.log("PAGE =", page);
      console.log("PAGE URL =", pageUrl);

      const response = await fetch(pageUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
        },
      });

      if (!response.ok) {
        break;
      }

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
        const paragraphs = $("#node-content p")
          .map((_, el) => $(el).text().trim())
          .get()
          .filter(Boolean);

        pageContent = paragraphs.join("\n\n");
      } else {
        const paragraphs = $("article p")
          .map((_, el) => $(el).text().trim())
          .get()
          .filter(Boolean);

        pageContent = paragraphs.join("\n\n");
      }

      if (!pageContent) {
        break;
      }

      if (seenContents.has(pageContent)) {
        continue;
      }

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
