import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import Loading from "@/components/loading";
import Markdown from "@/components/markdown";
import { Giscus } from "@giscus/react";

export default () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});

  const oldTitle = "羽衣尘的个人技术博客";

  const getPostDetail = async () => {
    setLoading(true);

    const { data } = await axios.get(`/api/posts/${params.id}`);
    setDetail(data);
    window.scrollTo(0, 0);
    setLoading(false);
    if (data.title) {
      document.title = `${oldTitle}-${data.title}`;
    }
  };

  useEffect(() => {
    getPostDetail();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  return (
    <Loading loading={loading}>
      <article className="flex flex-col shadow dark:border dark:border-gray-800 my-4 rounded" id="write">
        {detail.cover && (
          <img className="hover:opacity-75" src={`/api${detail.cover.url}`} />
        )}
        <div className="bg-white dark:bg-black p-6">
          <span className="inline-block text-xs uppercase px-2 py-1 mb-4 border border-sky-400 text-sky-400 rounded mr-4">
            {detail.link ? "转发文章" : "原创文章"}
          </span>
          <div className="text-3xl font-bold hover:text-gray-700 dark:hover:text-gray-400 pb-4 transition">
            {detail.title}
          </div>
          <p className="text-sm pb-8">
            By
            <a className="font-semibold hover:text-gray-800 dark:hover:text-gray-400 transition">羽衣尘</a>, 更新于
            {dayjs(detail.updated_at).format("YYYY-MM-DD: HH:mm:ss")}
          </p>
          <Markdown>{detail.content}</Markdown>
        </div>
      </article>
      <div className="p-4 bg-white dark:bg-black rounded">
        {detail.title && (
          <Giscus
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
