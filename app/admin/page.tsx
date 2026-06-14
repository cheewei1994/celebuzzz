"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
export default function AdminPage() {

  const [blocks, setBlocks] = useState([
  {
    id: 1,
    preview: "",
    imageUrl: "",
    content: "",
  },
]);

  const [coverPreview, setCoverPreview] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("台灣");
  const [summary, setSummary] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  

  const addBlock = () => {
  setBlocks([
    ...blocks,
    {
      id: Date.now(),
      preview: "",
      imageUrl: "",
      content: "",
    },
  ]);
};

  const removeBlock = (blockId: number) => {
  setBlocks(
    blocks.filter((block) => block.id !== blockId)
  );
};

const saveDraft = async () => {
  const { error } = await supabase
    .from("articles")
    .insert([
      {
        title,
        category,
        summary,
        source_url: sourceUrl,
        cover: coverPreview,
        blocks,
        status: "draft",
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("草稿已保存");
};

const handleScrape = async () => {
  if (!sourceUrl) {
    alert("請輸入文章網址");
    return;
  }

  const res = await fetch("/api/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: sourceUrl,
    }),
  });

  const data = await res.json();

console.log("COUNT =", data.blocks?.length);
console.log("BLOCKS =", data.blocks);

  if (!data.success) {
    alert("採集失敗");
    return;
  }

  setTitle(data.title || "");
  setSummary(data.summary || "");

  if (data.image) {
  setCoverPreview(data.image);
}

if (data.blocks?.length) {
  setBlocks(
    data.blocks.map(
      (item: string, index: number) => {
        try {
          const block = JSON.parse(item);

          return {
            id: Date.now() + index,
            preview: block.imageUrl || "",
            imageUrl: block.imageUrl || "",
            content: block.content || "",
          };
        } catch {
          return {
            id: Date.now() + index,
            preview: "",
            imageUrl: "",
            content: item,
          };
        }
      }
    )
  );
}
if (data.content) {
  setBlocks([
    {
      id: Date.now(),
      preview: "",
      imageUrl: "",
      content: data.content,
    },
  ]);
}

alert("採集成功");
};

const publishArticle = async () => {
  const { error } = await supabase
    .from("articles")
    .insert([
      {
        title,
        category,
        summary,
        source_url: sourceUrl,
        cover: coverPreview,
        blocks,
        status: "published",
        views: 0,
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("文章發布成功");

  window.location.href =
    "/admin/articles";
};

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        文章發布後台
      </h1>

      <div className="bg-white rounded-2xl shadow p-8 space-y-5">

        {/* 標題 */}
        <div>
          <label className="block mb-2 font-medium">
            文章標題
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="請輸入標題"
          />
        </div>

        {/* 分類 */}
        <div>
          <label className="block mb-2 font-medium">
            分類
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>台灣</option>
            <option>娛樂</option>
            <option>情感</option>
            <option>命理</option>
            <option>健康</option>
            <option>美食</option>
            <option>奇聞</option>
            <option>生活</option>
            <option>寵物</option>
          </select>
        </div>

        {/* 封面圖 */}
        <div>
          <label className="block mb-2 font-medium">
            封面圖片
          </label>

          <p className="text-sm text-gray-500 mb-3">
            建議大小：
            <span className="text-red-500 font-semibold">
                800 × 417 px
            </span>
            ，選擇合適比例的圖片才能獲得更好的效果。
        </p>
<input
  type="text"
  placeholder="輸入封面圖片網址 https://..."
  value={coverPreview}
  onChange={(e) => {
    setCoverPreview(e.target.value);
  }}
  className="w-full border rounded-lg p-3 mb-3"
/>

          <input
            type="file"
  accept="image/*"
  className="w-full border rounded-lg p-3"
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  }}
/>
{coverPreview && (
  <img
    src={coverPreview}
    alt="封面預覽"
    className="mt-4 rounded-xl border max-h-60"
  />
)}
        </div>
<div>
  <label className="block mb-2 font-medium">
    採集文章原網址
  </label>

  <div className="flex gap-3 items-center">
    <input
      type="text"
      value={sourceUrl}
      onChange={(e) => setSourceUrl(e.target.value)}
      className="flex-1 border rounded-lg p-3"
      placeholder="https://example.com/article"
    />

    <button
      type="button"
      onClick={handleScrape}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg whitespace-nowrap"
    >
      採集文章
    </button>
  </div>
</div>

        {/* 摘要 */}
        <div>
          <label className="block mb-2 font-medium">
            摘要
          </label>

          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border rounded-lg p-3"
            rows={4}
          />
        </div>

       {blocks.map((block, index) => (
  <div
    key={block.id}
    className="border rounded-xl p-5 space-y-4"
  >
    <div className="flex items-center justify-between">
  <h2 className="font-bold text-lg">
    內文區塊 {index + 1}
  </h2>

  <button
    type="button"
    onClick={() => {
  if (blocks.length > 1) {
    removeBlock(block.id);
  }
}}
    className="text-red-500 text-sm hover:text-red-700"
  >
    🗑 刪除
  </button>
</div>

    <div>
      <label className="block mb-2 font-medium">
        圖片
      </label>

      <input
  type="text"
  placeholder="輸入圖片網址 https://..."
  value={block.imageUrl}
  onChange={(e) => {
    const updated = [...blocks];

    updated[index].imageUrl = e.target.value;
    updated[index].preview = e.target.value;

    setBlocks(updated);
  }}
  className="w-full border rounded-lg p-3 mb-3"
/>

      <input
  type="file"
  accept="image/*"
  className="w-full border rounded-lg p-3"
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const updated = [...blocks];

    updated[index].preview =
      URL.createObjectURL(file);

    updated[index].imageUrl = ""

    setBlocks(updated);
  }}
/>
{block.preview && (
  <img
    src={block.preview}
    alt=""
    className="mt-4 rounded-xl border max-h-48"
  />
)}
    </div>

    <div>
      <label className="block mb-2 font-medium">
        文字內容
      </label>

      <textarea
        className="w-full border rounded-lg p-3"
  rows={6}
  placeholder="請輸入段落內容..."
  value={block.content}
  onChange={(e) => {
    const updated = [...blocks];

    updated[index].content =
      e.target.value;

    setBlocks(updated);
  }}
/>
    </div>
  </div>
))}

<button
  type="button"
  onClick={addBlock}
  className="w-full border-2 border-dashed border-gray-300 rounded-xl py-4 text-gray-600 hover:bg-gray-50"
>
  ＋ 新增區塊
</button>

        <div className="flex justify-center gap-3">
  <button
    type="button"
    onClick={saveDraft}
    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600"
  >
    保存草稿
  </button>

  <button
    type="button"
    onClick={publishArticle}
    className="bg-violet-600 text-white px-8 py-3 rounded-lg hover:bg-violet-700"
  >
    發布文章
</button>

</div>

      </div>
    </main>
  );
}