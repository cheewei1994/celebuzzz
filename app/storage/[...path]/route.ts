import { NextRequest } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

const STORAGE_ROOT = path.join(process.cwd(), "public", "storage");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: segments } = await params;

    const relativePath = segments.join("/");
    const filePath = path.resolve(STORAGE_ROOT, relativePath);

    if (
      filePath !== STORAGE_ROOT &&
      !filePath.startsWith(`${STORAGE_ROOT}${path.sep}`)
    ) {
      return new Response("Forbidden", { status: 403 });
    }

    const fileInfo = await stat(filePath);

    if (!fileInfo.isFile()) {
      return new Response("Not Found", { status: 404 });
    }

    const file = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": CONTENT_TYPES[ext] || "application/octet-stream",
        "Content-Length": String(fileInfo.size),
        "Cache-Control": "public, max-age=14400",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
