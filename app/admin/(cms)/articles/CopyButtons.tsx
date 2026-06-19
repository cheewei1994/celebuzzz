"use client";

import toast from "react-hot-toast";
export default function CopyButtons({
  article,
}: {
  article: any;
}) {
  const copyTitleLink = async () => {
  const text =
`${article.title} ${window.location.origin}/article/${article.id}`;

  await navigator.clipboard.writeText(text);
  toast.success("已複製標題連結");
};

  const copyCover = async () => {
    await navigator.clipboard.writeText(
      article.cover || ""
    );

    toast.success("已複製封面網址");
  };

  const copyLongImage = async () => {
    await navigator.clipboard.writeText(
      article.long_image || ""
    );

    toast.success("已複製長圖網址");
  };

  const copyLongImageFile = async () => {
  try {
    const response = await fetch(
      article.long_image
    );

    const blob = await response.blob();

const pngBlob = await new Promise<Blob>(
  (resolve) => {
    const img = document.createElement("img");

    img.onload = () => {
      const canvas =
        document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx =
        canvas.getContext("2d");

      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (b) => resolve(b!),
        "image/png"
      );
    };

    img.src = URL.createObjectURL(blob);
  }
);

await navigator.clipboard.write([
  new ClipboardItem({
    "image/png": pngBlob,
  }),
]);

    toast.success("已複製長圖圖片");
  } catch (err) {
    toast.error("複製失敗");
    console.error(err);
  }
};

  const copyArticle = async () => {
    const content =
      article.blocks
        ?.map(
          (block: any) =>
            block.content || ""
        )
        .join("\n\n") || "";

    await navigator.clipboard.writeText(
      content
    );

    toast.success("已複製文案");
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        onClick={copyTitleLink}
        className="bg-green-600 text-white text-xs rounded px-2 py-2"
      >
        標題連結
      </button>

      <button
        onClick={copyCover}
        className="bg-green-600 text-white text-xs rounded px-2 py-2"
      >
        複製封面
      </button>

      <button
        onClick={copyArticle}
        className="bg-green-600 text-white text-xs rounded px-2 py-2"
      >
        複製文案
      </button>

      <button
        onClick={copyLongImage}
        className="bg-green-600 text-white text-xs rounded px-2 py-2"
      >
        複製長圖
      </button>

      <button
  onClick={copyLongImageFile}
  className="col-span-2 bg-orange-600 text-white text-xs rounded px-2 py-2"
>
  複製長圖圖片
</button>
    </div>
  );
}