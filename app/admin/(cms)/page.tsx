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
  const [longImage, setLongImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("台灣");
  const [summary, setSummary] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  const [showImageModal, setShowImageModal] = useState(false);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [tempImageUrl, setTempImageUrl] = useState("");

  const uploadImage = async (file: File, bucket: string) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return "";
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return data.publicUrl;
  };

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
    setBlocks(blocks.filter((block) => block.id !== blockId));
  };

  const moveBlockUp = (index: number) => {
    if (index === 0) return;

    const updated = [...blocks];

    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];

    setBlocks(updated);
  };

  const moveBlockDown = (index: number) => {
    if (index === blocks.length - 1) return;

    const updated = [...blocks];

    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];

    setBlocks(updated);
  };

  const saveDraft = async () => {
    const res = await fetch("/api/admin/articles/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        summary,
        sourceUrl,
        cover: coverPreview,
        longImage,
        blocks,
        status: "draft",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "保存失敗");
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

    if (data.longImage) {
      setLongImage(data.longImage);
    }

    if (data.blocks?.length) {
      setBlocks(
        data.blocks.map((item: string, index: number) => {
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
        }),
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
    const res = await fetch("/api/admin/articles/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        summary,
        sourceUrl,
        cover: coverPreview,
        longImage,
        blocks,
        status: "published",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "發布失敗");
      return;
    }

    alert("文章發布成功");

    window.location.href = "/admin/articles";
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">文章發布後台</h1>

      <div className="bg-white rounded-2xl shadow p-8 space-y-5">
        <div>
          <label className="block mb-2 font-medium">原文網址</label>

          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2"
              placeholder="https://example.com/article"
            />

            <button
              type="button"
              onClick={handleScrape}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"
            >
              採集文章
            </button>
          </div>
        </div>

        {/* 標題 */}
        <div>
          <label className="block mb-2 font-medium">文章標題</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="請輸入標題"
          />
        </div>

        {/* 摘要 */}
        <div>
          <label className="block mb-2 font-medium">摘要</label>

          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border rounded-lg p-3 resize-none"
            rows={3}
          />
        </div>

        {/* 分類 */}
        <div>
          <label className="block mb-2 font-medium">分類</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>台灣</option>
            <option>娛樂</option>
            <option>時事</option>
            <option>社會</option>
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
          <label className="block mb-2 font-medium">封面圖</label>

          <p className="text-sm text-gray-500 mb-3">
            建議大小：
            <span className="text-red-500 font-semibold">800 × 417 px</span>
            ，選擇合適比例的圖片才能獲得更好的效果。
          </p>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="輸入封面圖片網址"
              value={coverPreview}
              onChange={(e) => {
                setCoverPreview(e.target.value);
              }}
              className="w-[600px] h-11 border rounded-lg px-3"
            />

            <span className="text-gray-500">或</span>

            <label
              className="
    w-70
    h-11
    border
    rounded-lg
    bg-white
    hover:bg-gray-50
    text-gray-700
    flex
    items-center
    justify-center
    cursor-pointer
    text-base
  "
            >
              上傳本地圖片
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const url = await uploadImage(file, "covers");

                  if (url) {
                    setCoverPreview(url);
                  }
                }}
              />
            </label>
          </div>
          {coverPreview && (
            <img
              src={coverPreview}
              alt="封面預覽"
              className="mt-4 w-64 h-36 object-cover rounded-xl border"
            />
          )}

          {/* 長圖 */}
          <div className="mt-4">
            <label className="block mb-2 font-medium">長圖</label>

            <p className="text-sm text-gray-500 mb-3">
              建議大小：
              <span className="text-red-500 font-semibold">516 × 640 px</span>
              ，選擇合適比例的圖片才能獲得更好的效果。
            </p>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="輸入長圖網址"
                value={longImage}
                onChange={(e) => setLongImage(e.target.value)}
                className="w-[600px] h-11 border rounded-lg px-3"
              />

              <span className="text-gray-500">或</span>

              <label className="w-70 h-11 border rounded-lg bg-white hover:bg-gray-50 text-gray-700 text-base flex items-center justify-center cursor-pointer">
                上傳本地圖片
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];

                    if (!file) return;

                    const fileName = `${Date.now()}-${file.name}`;

                    const { error } = await supabase.storage
                      .from("long-images")
                      .upload(fileName, file);

                    if (error) {
                      alert(error.message);
                      return;
                    }

                    const { data } = supabase.storage
                      .from("long-images")
                      .getPublicUrl(fileName);

                    setLongImage(data.publicUrl);
                  }}
                />
              </label>
            </div>

            {longImage && (
              <img
                src={longImage}
                alt=""
                className="mt-4 w-38 h-50 object-cover rounded-xl border"
              />
            )}
          </div>
        </div>

        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="border rounded-xl p-5 space-y-4 bg-white shadow-sm mb-4"
          >
            <div>
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-2 flex items-center h-32">
                  <div className="space-y-2 w-full">
                    <button
                      type="button"
                      onClick={() => moveBlockUp(index)}
                      className="w-full bg-slate-600 hover:bg-slate-700 text-white rounded-lg py-2 text-sm"
                    >
                      上移
                    </button>

                    <button
                      type="button"
                      onClick={() => moveBlockDown(index)}
                      className="w-full bg-slate-600 hover:bg-slate-700 text-white rounded-lg py-2 text-sm"
                    >
                      下移
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (blocks.length > 1) {
                          removeBlock(block.id);
                        }
                      }}
                      className="w-full bg-slate-600 hover:bg-slate-700 text-white rounded-lg py-2 text-sm"
                    >
                      刪除
                    </button>
                  </div>
                </div>

                <div className="col-span-3">
                  <div
                    className="
    relative
    w-48
    h-38
    border
    rounded-lg
    overflow-hidden
    flex
    items-center
    justify-center
    bg-gray-300
    cursor-pointer
    hover:border-blue-500
  "
                    onClick={() => {
                      setCurrentIndex(index);

                      setTempImageUrl(block.imageUrl || "");

                      setShowImageModal(true);
                    }}
                  >
                    <div className="absolute top-0 left-0 bg-gray-600 text-white text-xs w-5 h-5 rounded flex items-center justify-center z-10">
                      {index + 1}
                    </div>

                    {block.preview ? (
                      <img
                        src={block.preview}
                        alt=""
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400">圖片預覽</span>
                    )}
                  </div>
                </div>

                <div className="col-span-7 flex items-start">
                  <textarea
                    rows={8}
                    className="w-full border rounded-lg p-3 h-38"
                    value={block.content}
                    onChange={(e) => {
                      const updated = [...blocks];

                      updated[index].content = e.target.value;

                      setBlocks(updated);
                    }}
                    placeholder="請輸入段落內容..."
                  />
                </div>
              </div>
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

      {showImageModal && (
        <div
          className="
    fixed inset-0
    bg-black/60
    flex
    items-center
    justify-center
    z-50
  "
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-[700px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">新增圖片</h2>

              <button
                onClick={() => setShowImageModal(false)}
                className="
    w-10
    h-10
    rounded-full
    hover:bg-gray-100
    text-gray-500
    text-xl
  "
              >
                ✕
              </button>
            </div>

            {/* 圖片網址 */}

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={tempImageUrl}
                onChange={(e) => setTempImageUrl(e.target.value)}
                placeholder="輸入圖片網址"
                className="
            flex-1
            border
            rounded-lg
            px-3
            h-11
          "
              />

              <button
                onClick={() => {
                  if (currentIndex === null) return;

                  const updated = [...blocks];

                  updated[currentIndex].imageUrl = tempImageUrl;

                  updated[currentIndex].preview = tempImageUrl;

                  setBlocks(updated);

                  setShowImageModal(false);
                }}
                className="
            bg-sky-500
            text-white
            px-4
            rounded-lg
          "
              >
                保存圖片
              </button>
            </div>

            {/* 圖片預覽 */}

            <div className="mb-4">
              <div className="text-sm font-medium mb-2">圖片預覽</div>

              {tempImageUrl ? (
                <img
                  src={tempImageUrl}
                  alt=""
                  className="
              w-full
              h-72
              object-contain
              border
              rounded-lg
              bg-gray-50
            "
                />
              ) : (
                <div
                  className="
              w-full
              h-72
              border
              rounded-lg
              bg-gray-50
              flex
              items-center
              justify-center
              text-gray-400
            "
                >
                  尚未選擇圖片
                </div>
              )}
            </div>

            {/* 本地上傳 */}

            <label
              className="
          h-12
          border
          rounded-lg
          flex
          items-center
          justify-center
          cursor-pointer
          hover:bg-gray-50
        "
            >
              上傳本地圖片
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const url = await uploadImage(file, "article-images");

                  if (!url || currentIndex === null) return;

                  const updated = [...blocks];

                  updated[currentIndex].imageUrl = url;

                  updated[currentIndex].preview = url;

                  setBlocks(updated);

                  setShowImageModal(false);
                }}
              />
            </label>
          </div>
        </div>
      )}
    </main>
  );
}
