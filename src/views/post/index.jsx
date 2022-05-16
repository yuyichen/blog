import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "@/components/loading";
import Markdown from "@/components/markdown";
import { Giscus } from "@giscus/react";
import Tag from "@/components/tag";
import { formatDate } from "@/utils";

export default () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});

  const oldTitle = "羽衣尘的个人技术博客";

  const getPostDetail = async () => {
    setLoading(true);

    const { data } = await axios.get(`/api/posts/${params.id}`);
    setDetail(data);
    window.scrollTo(0, 0, { behavior: "smooth" });
    setLoading(false);
    if (data.title) {
      document.title = `${data.title}-${oldTitle}`;
    }
  };

  useEffect(() => {
    getPostDetail();
    return () => {
      document.title = oldTitle;
    };
  }, [params.id]);

  const titleClassName =
    "text-3xl font-bold hover:text-gray-700 dark:hover:text-gray-400 pb-4 transition";

  const markdownContent = `
  ${detail.description ? `> ${detail.description}\n\n` : ""}
  ${detail.link ? `<x-outer-link href="${detail.link}"/>` : ""}
  ${detail.content || ""}
  `;

  return (
    <Loading loading={loading} className="max-w-screen-lg">
      <article className="flex flex-col shadow dark:border dark:border-gray-800 my-4 rounded">
        {detail.cover && (
          <img className="hover:opacity-75" src={`/api${detail.cover.url}`} />
        )}
        <div className="bg-white dark:bg-black p-6">
          {detail?.link ? (
            <a href={detail.link} target="_blank" className={titleClassName}>
              {detail.title}
            </a>
          ) : (
            <div className={titleClassName}>{detail.title}</div>
          )}
          <p className="text-sm py-4">
            <Tag type={detail.link ? 2 : 1} className="mr-4" />
            By
            <a className="font-semibold hover:text-gray-800 dark:hover:text-gray-400 transition">
              羽衣尘
            </a>
            ， 更新于
            {formatDate(detail.updated_at)}
          </p>
          <div id="write">
            <Markdown>{markdownContent}</Markdown>
          </div>
        </div>
      </article>
      <div className="p-4 bg-white dark:bg-black rounded">
        {detail.title && (
          <Giscus
            key={params.id}
            repo="yuyichen/blog"
            repoId={import.meta.env.VITE_REPO_ID}
            category="Announcements"
            categoryId={import.meta.env.VITE_CATGORY_ID}
            mapping="url"
            reactionsEnabled="1"
            emitMetadata="0"
            theme="light"
            lang="zh-CN"
            // term="..."
          />
        )}
      </div>
    </Loading>
  );
};
