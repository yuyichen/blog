import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // github风格表格、链接、checklist
import Loading from "@/components/loading";
import CodeBox from "@/components/code-box";
import rehypeHighlight from "rehype-highlight"; // 代码高亮
import rehypeRaw from "rehype-raw"; // 支持markdown中的html代码
import "highlight.js/styles/atom-one-dark-reasonable.css";
import Viewer from "viewerjs"; // 图片预览
import "viewerjs/dist/viewer.min.css";
import { Giscus } from "@giscus/react"; // 评论插件

export default () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});
  const [gallery, setGallery] = useState();

  useEffect(async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/posts/${params.id}`);
    setDetail(data);
    window.scrollTo(0, 0);
    setLoading(false);

    setGallery(new Viewer(document.getElementById("acticleContent")));
    return () => {
      gallery?.destroy();
    };
  }, [params.id]);

  return (
    <Loading loading={loading}>
      <article className="flex flex-col shadow my-4" id="write">
        {detail.cover && (
          <img className="hover:opacity-75" src={`/api${detail.cover.url}`} />
        )}
        <div className="bg-white flex flex-col justify-start p-6">
          <a className="text-blue-700 text-sm font-bold uppercase pb-4">
            Technology
          </a>
          <div className="text-3xl font-bold hover:text-gray-700 pb-4">
            {detail.title}
          </div>
          <p className="text-sm pb-8">
            By
            <a className="font-semibold hover:text-gray-800">羽衣尘</a>, 更新于
            {dayjs(detail.updated_at).format("YYYY-MM-DD: HH:mm:ss")}
          </p>
          <div id="acticleContent">
            <ReactMarkdown
              linkTarget="_blank"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                // // Use h2s instead of h1s
                // h1: "h2",
                // // Use a component instead of hrs
                // hr: ({ node, ...props }) => <MyFancyRule {...props} />,
                img: ({ node, ...props }) => (
                  <img
                    {...props}
                    onClick={() => {
                      if (gallery) {
                        const index = gallery.images.findIndex(
                          (x) => x.src === props.src
                        );
                        gallery.view(index);
                      }
                    }}
                  />
                ),
                code: ({ node, ...props }) => {
                  const { inline, ...rest } = props;
                  return inline ? (
                    <code
                      className="p-1 rounded-sm"
                      style={{
                        color: "#c7254e",
                        backgroundColor: "#f9f2f4",
                        fontFamily: "monospace,monospace",
                      }}
                      {...rest}
                    />
                  ) : (
                    <CodeBox {...rest} />
                  );
                },
              }}
            >
              {detail.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
      <div className="p-4">
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
