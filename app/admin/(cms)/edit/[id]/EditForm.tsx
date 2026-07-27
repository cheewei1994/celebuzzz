"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EditForm(props: any) {
  const article = props.article;
  const [title, setTitle] = useState(article.title || "");
  const [summary, setSummary] = useState(article.summary || "");
  const [category, setCategory] = useState(article.category || "台灣");
  const [sourceUrl, setSourceUrl] = useState(article.source_url || "");

  const [cover, setCover] = useState(article.cover || "");

  const [longImage, setLongImage] = useState(article.long_image || "");

  const [showImageModal, setShowImageModal] = useState(false);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [tempImageUrl, setTempImageUrl] = useState("");

  const uploadLongImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("article-images")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("article-images").getPublicUrl(fileName);

    setLongImage(publicUrl);
  };

  const [blocks, setBlocks] = useState(
    (article.blocks || []).map((block: any, index: number) => ({
      id: Date.now() + index,
      preview: block.imageUrl || "",
      imageUrl: block.imageUrl || "",
      content: block.content || "",
    })),
  );

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
    setBlocks(blocks.filter((block: any) => block.id !== blockId));
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

  const uploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("article-images")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("article-images").getPublicUrl(fileName);

    setCover(publicUrl);
  };

  const uploadBlockImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("article-images")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("article-images").getPublicUrl(fileName);

    const updated = [...blocks];

    updated[index].imageUrl = publicUrl;
    updated[index].preview = publicUrl;

    setBlocks(updated);
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
      setCover(data.image);
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
    const res = await fetch("/api/admin/articles/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: article.id,
        title,
        summary,
        category,
        sourceUrl,
        cover,
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

    alert("文章已發布");

    window.location.href = "/admin/articles";
  };

  const updateDraft = async () => {
    const res = await fetch("/api/admin/articles/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: article.id,
        title,
        summary,
        category,
        sourceUrl,
        cover,
        longImage,
        blocks,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "更新失敗");
      return;
    }

    alert("草稿已更新");

    window.location.reload();
  };

  return (
    <>
      <div
        className="
    bg-white
    p-8
    rounded-2xl
    shadow
    space-y-5
    w-full
  "
      >
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
              className="
    bg-blue-600
    text-white
    px-4
    py-2
    rounded-lg
    whitespace-nowrap
  "
            >
              採集文章
            </button>
          </div>
        </div>

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

        <div>
          <label className="block mb-2 font-medium">摘要</label>

          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border rounded-lg p-3 resize-none"
            rows={3}
          />
        </div>

        <label className="block mb-2 font-medium">分類</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded-lg"
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

        <div className="space-y-2">
          <label className="block mb-2 font-medium">封面圖</label>

          <p className="text-sm text-gray-500 mb-3">
            建議大小：
            <span className="text-red-500 font-semibold">800 × 417 px</span>
            ，選擇合適比例的圖片才能獲得更好的效果。
          </p>

          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className="w-[600px] h-11 border rounded-lg px-3"
              placeholder="輸入圖片網址"
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
    "
            >
              上傳本地圖片
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadCover}
              />
            </label>
          </div>

          {cover && (
            <img
              src={cover}
              alt=""
              className="mt-4 w-64 h-36 object-cover rounded-xl border"
            />
          )}

          <div className="space-y-2 mt-6">
            <label className="font-medium">長圖</label>

            <p className="text-sm text-gray-500 mb-3">
              建議大小：
              <span className="text-red-500 font-semibold">516 × 640 px</span>
              ，選擇合適比例的圖片才能獲得更好的效果。
            </p>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={longImage}
                onChange={(e) => setLongImage(e.target.value)}
                className="w-[600px] h-11 border rounded-lg px-3"
                placeholder="輸入長圖網址"
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
    "
              >
                上傳本地圖片
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={uploadLongImage}
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

        {blocks.map((block: any, index: number) => (
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
            onClick={updateDraft}
            className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600"
          >
            更新草稿
          </button>

          <button
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
            className="
        bg-white
        rounded-xl
        p-6
        w-[700px]
      "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <h2 className="font-bold text-lg">新增圖片</h2>

              <button onClick={() => setShowImageModal(false)}>✕</button>
            </div>

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

            <div className="mb-4">
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
            "
                />
              ) : (
                <div
                  className="
              w-full
              h-72
              border
              rounded-lg
              flex
              items-center
              justify-center
            "
                >
                  尚未選擇圖片
                </div>
              )}
            </div>

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

                  const fileName = `${Date.now()}-${file.name}`;

                  const { error } = await supabase.storage
                    .from("article-images")
                    .upload(fileName, file);

                  if (error) {
                    alert(error.message);
                    return;
                  }

                  const { data } = supabase.storage
                    .from("article-images")
                    .getPublicUrl(fileName);

                  setTempImageUrl(data.publicUrl);
                }}
              />
            </label>
          </div>
        </div>
      )}
    </>
  );
}
