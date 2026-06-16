"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EditForm(props: any) {
  const article = props.article;
  const [title, setTitle] = useState(article.title || "");
  const [summary, setSummary] = useState(article.summary || "");
  const [category, setCategory] = useState(article.category || "台灣");

  const [cover, setCover] = useState(
  article.cover || ""
);

  const [blocks, setBlocks] = useState(
  article.blocks || []
);

const uploadCover = async (
    
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const fileName =
    Date.now() + "-" + file.name;

  const { error } = await supabase.storage
    .from("article-images")
    .upload(fileName, file);

  if (error) {
    alert(error.message);
    return;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("article-images")
    .getPublicUrl(fileName);

  setCover(publicUrl);
};

const uploadBlockImage = async (
e: React.ChangeEvent<HTMLInputElement>,
index: number
) => {
const file = e.target.files?.[0];

if (!file) return;

const fileName =
Date.now() + "-" + file.name;

const { error } = await supabase.storage
.from("article-images")
.upload(fileName, file);

if (error) {
alert(error.message);
return;
}

const {
data: { publicUrl },
} = supabase.storage
.from("article-images")
.getPublicUrl(fileName);

const updated = [...blocks];
updated[index].imageUrl = publicUrl;
setBlocks(updated);
};

const publishArticle = async () => {
  const { error } = await supabase
    .from("articles")
    .update({
      title,
      summary,
      category,
      cover,
      blocks,
      status: "published",
    })
    .eq("id", article.id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("文章已發布");
};

  const updateDraft = async () => {
    const { error } = await supabase
      .from("articles")
      .update({
        title,
        summary,
        category,
        cover,
        blocks,
      })
      .eq("id", article.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("草稿已更新");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={5}
        className="w-full border p-3 rounded-lg"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-3 rounded-lg"
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

      <div className="space-y-2">
  <label className="font-medium">
    封面圖片
  </label>

  <input
    type="text"
    value={cover}
    onChange={(e) =>
      setCover(e.target.value)
    }
    placeholder="輸入圖片網址"
    className="w-full border p-3 rounded-lg"
  />

  <input
  type="file"
  accept="image/*"
  onChange={uploadCover}
  className="w-full border p-3 rounded-lg"
/>

  {cover && (
    <img
      src={cover}
      alt=""
      className="rounded-lg border max-h-60"
    />
  )}
</div>

{blocks.map((block: any, index: number) => (
  <div
    key={index}
    className="border rounded-xl p-4 space-y-3"
  >
    <h3 className="font-bold">
      區塊 {index + 1}
    </h3>

    <input
      type="text"
      placeholder="圖片網址"
      value={block.imageUrl || ""}
      onChange={(e) => {
        const updated = [...blocks];
        updated[index].imageUrl = e.target.value;
        setBlocks(updated);
      }}
      className="w-full border p-3 rounded-lg"
    />

    <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    uploadBlockImage(e, index)
  }
  className="w-full border p-3 rounded-lg"
/>

    {block.imageUrl && (
  <>
    <img
      src={block.imageUrl}
      alt=""
      className="rounded-lg border max-h-60"
    />

    <button
      type="button"
      onClick={() => {
        const updated = [...blocks];
        updated[index].imageUrl = "";
        setBlocks(updated);
      }}
      className="text-red-500 hover:text-red-700"
    >
      🖼️ 刪除圖片
    </button>
  </>
)}

    <textarea
      rows={5}
      placeholder="內容"
      value={block.content || ""}
      onChange={(e) => {
        const updated = [...blocks];
        updated[index].content = e.target.value;
        setBlocks(updated);
      }}
      className="w-full border p-3 rounded-lg"
    />

<button
  type="button"
  onClick={() => {
    setBlocks(
      blocks.filter(
        (_: any, i: number) => i !== index
      )
    );
  }}
  className="text-red-500 hover:text-red-700"
>
  🗑 刪除區塊
</button>

  </div>
  
))}

<button
  type="button"
  onClick={() => {
    setBlocks([
      ...blocks,
      {
        imageUrl: "",
        content: "",
      },
    ]);
  }}
  className="bg-gray-200 px-4 py-2 rounded-lg"
>
  ＋新增區塊
</button>

     <div className="flex gap-3">
  <button
    onClick={updateDraft}
    className="bg-violet-600 text-white px-6 py-3 rounded-lg"
  >
    更新草稿
  </button>

  <button
    onClick={publishArticle}
    className="bg-green-600 text-white px-6 py-3 rounded-lg"
  >
    發布文章
  </button>
</div>

    </div>
  );
}