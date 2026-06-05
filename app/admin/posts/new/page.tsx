"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Block = {
  image: string;
  content: string;
};

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  const [cover, setCover] = useState("");
  const [longImage, setLongImage] = useState("");

  const [category, setCategory] = useState("");

  const [blocks, setBlocks] = useState<Block[]>([
    {
      image: "",
      content: "",
    },
  ]);

  const addBlock = () => {
    setBlocks([
      ...blocks,
      {
        image: "",
        content: "",
      },
    ]);
  };

  const deleteBlock = (index: number) => {
    setBlocks(
      blocks.filter((_, i) => i !== index)
    );
  };

  const moveUp = (index: number) => {
    if (index === 0) return;

    const arr = [...blocks];

    [arr[index], arr[index - 1]] = [
      arr[index - 1],
      arr[index],
    ];

    setBlocks(arr);
  };

  const moveDown = (index: number) => {
    if (index === blocks.length - 1)
      return;

    const arr = [...blocks];

    [arr[index], arr[index + 1]] = [
      arr[index + 1],
      arr[index],
    ];

    setBlocks(arr);
  };  const uploadFile = async (
    file: File,
    bucket: string
  ) => {
    const fileName =
      Date.now() + "-" + file.name;

    const { error } =
      await supabase.storage
        .from(bucket)
        .upload(fileName, file);

    if (error) {
      alert(error.message);
      return "";
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const uploadCover = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = await uploadFile(
      file,
      "covers"
    );

    setCover(url);
  };

  const uploadLongImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = await uploadFile(
      file,
      "long-images"
    );

    setLongImage(url);
  };

  const uploadBlockImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = await uploadFile(
      file,
      "article-images"
    );

    const arr = [...blocks];

    arr[index].image = url;

    setBlocks(arr);
  };

  const updateBlockContent = (
    index: number,
    value: string
  ) => {
    const arr = [...blocks];

    arr[index].content = value;

    setBlocks(arr);
  };

  const updateBlockImageUrl = (
    index: number,
    value: string
  ) => {
    const arr = [...blocks];

    arr[index].image = value;

    setBlocks(arr);
  };  const saveArticle = async (
    status: "draft" | "published"
  ) => {
    const { data: article, error } =
      await supabase
        .from("articles")
        .insert([
          {
            title,
            summary,
            source_url: sourceUrl,
            cover,
            long_image: longImage,
            category,
            status,
          },
        ])
        .select()
        .single();

    if (error) {
      alert(error.message);
      return;
    }

    const rows: any[] = [];

    blocks.forEach((block, index) => {
      if (block.image) {
        rows.push({
          article_id: article.id,
          type: "image",
          content: block.image,
          sort_order: index,
        });
      }

      if (block.content) {
        rows.push({
          article_id: article.id,
          type: "text",
          content: block.content,
          sort_order: index,
        });
      }
    });

    if (rows.length > 0) {
      await supabase
        .from("article_blocks")
        .insert(rows);
    }

    alert(
      status === "draft"
        ? "草稿已保存"
        : "發布成功"
    );
  };

  return (
    <div
      style={{
        background: "#e9e9e9",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "20px",
          }}
        >
          發表圖集
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr 120px",
            gap: "10px",
            marginBottom: "15px",
            alignItems: "center",
          }}
        >
          <label>原文網址</label>

          <input
            value={sourceUrl}
            onChange={(e) =>
              setSourceUrl(
                e.target.value
              )
            }
          />

          <button>
            採集
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          <label>標題</label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          <label>摘要</label>

          <textarea
            rows={4}
            value={summary}
            onChange={(e) =>
              setSummary(
                e.target.value
              )
            }
          />
        </div>        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr 1fr",
            gap: "10px",
            marginBottom: "15px",
            alignItems: "center",
          }}
        >
          <label>封面</label>

          <input
            placeholder="圖片網址"
            value={cover}
            onChange={(e) =>
              setCover(e.target.value)
            }
          />

          <input
            type="file"
            onChange={uploadCover}
          />
        </div>

        {cover && (
          <img
            src={cover}
            alt=""
            style={{
              width: "200px",
              marginBottom: "20px",
            }}
          />
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr 1fr",
            gap: "10px",
            marginBottom: "15px",
            alignItems: "center",
          }}
        >
          <label>長圖</label>

          <input
            placeholder="圖片網址"
            value={longImage}
            onChange={(e) =>
              setLongImage(
                e.target.value
              )
            }
          />

          <input
            type="file"
            onChange={uploadLongImage}
          />
        </div>

        {longImage && (
          <img
            src={longImage}
            alt=""
            style={{
              width: "200px",
              marginBottom: "20px",
            }}
          />
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <label>分類</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >
            <option value="">
              請選擇分類
            </option>

            <option>
              娛樂
            </option>

            <option>
              動漫
            </option>

            <option>
              小說
            </option>
          </select>
        </div>

        <hr />

        <h2>
          內文（圖片數：
          {blocks.length}
          ）
        </h2>

        {blocks.map(
          (block, index) => (
            <div
              key={index}
              style={{
                border:
                  "1px solid #ddd",
                padding: "15px",
                marginBottom:
                  "15px",
              }}
            >
              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "100px 250px 1fr",
                  gap: "15px",
                }}
              >
                <div>
                  <button
                    onClick={() =>
                      moveUp(index)
                    }
                  >
                    上移
                  </button>

                  <br />
                  <br />

                  <button
                    onClick={() =>
                      moveDown(
                        index
                      )
                    }
                  >
                    下移
                  </button>

                  <br />
                  <br />

                  <button
                    onClick={() =>
                      deleteBlock(
                        index
                      )
                    }
                  >
                    刪除
                  </button>
                </div>

                <div>
                  <input
                    placeholder="圖片網址"
                    value={
                      block.image
                    }
                    onChange={(
                      e
                    ) =>
                      updateBlockImageUrl(
                        index,
                        e.target
                          .value
                      )
                    }
                  />

                  <br />
                  <br />

                  <input
                    type="file"
                    onChange={(
                      e
                    ) =>
                      uploadBlockImage(
                        e,
                        index
                      )
                    }
                  />

                  <br />
                  <br />

                  {block.image && (
                    <img
                      src={
                        block.image
                      }
                      alt=""
                      style={{
                        width:
                          "220px",
                      }}
                    />
                  )}
                </div>

                <textarea
                  rows={10}
                  value={
                    block.content
                  }
                  onChange={(
                    e
                  ) =>
                    updateBlockContent(
                      index,
                      e.target
                        .value
                    )
                  }
                />
              </div>
            </div>
          )
        )}

        <button
          onClick={addBlock}
        >
          新增區塊
        </button>

        <hr
          style={{
            margin:
              "20px 0",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() =>
              saveArticle(
                "draft"
              )
            }
          >
            保存草稿
          </button>

          <button
            onClick={() =>
              saveArticle(
                "published"
              )
            }
          >
            發布
          </button>
        </div>
      </div>
    </div>
  );
}