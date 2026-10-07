import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const ALLOWED_BUCKETS = new Set([
  "article-images",
  "covers",
  "long-images",
]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const bucket = formData.get("bucket");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "未找到圖片檔案" },
        { status: 400 },
      );
    }

    if (typeof bucket !== "string" || !ALLOWED_BUCKETS.has(bucket)) {
      return NextResponse.json(
        { error: "不允許的圖片類型" },
        { status: 400 },
      );
    }

    const fileName = `${Date.now()}-${path.basename(file.name)}`;

    const storageRoot = path.join(process.cwd(), "public", "storage");
    const bucketDir = path.join(storageRoot, bucket);
    const filePath = path.join(bucketDir, fileName);

    await mkdir(bucketDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(filePath, buffer);

    const publicUrl = `/storage/${bucket}/${encodeURIComponent(fileName)}`;

    return NextResponse.json({
      success: true,
      fileName,
      publicUrl,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return NextResponse.json(
      { error: "圖片上傳失敗" },
      { status: 500 },
    );
  }
}
