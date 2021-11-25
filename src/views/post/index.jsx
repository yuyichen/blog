import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // github风格表格、链接、checklist
import Loading from "@/components/loading";
import rehypeHighlight from "rehype-highlight";

export default () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/posts/${params.id}`);
    setDetail(data);
    setLoading(false);
  }, [params.id]);

  return (
    <Loading loading={loading}>
      <article className="flex flex-col shadow my-4" id="write">
        <img
          className="hover:opacity-75"
          src={
            detail.cover
              ? `/api${detail.cover.url}`
              : `https://source.unsplash.com/collection/1346951/1000x500?sig=${detail.id}`
          }
        />
        <div className="bg-white flex flex-col justify-start p-6">
          <a className="text-blue-700 text-sm font-bold uppercase pb-4">
            Technology
          </a>
          <div className="text-3xl font-bold hover:text-gray-700 pb-4">
            {detail.title}
          </div>
          <p className="text-sm pb-8">
            By
            <a className="font-semibold hover:text-gray-800">羽衣尘</a>, 发布于{" "}
            {dayjs(detail.published_at).format("YYYY-MM-DD: HH:mm:ss")}
          </p>
          <ReactMarkdown
            linkTarget="_blank"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={
              {
                // // Use h2s instead of h1s
                // h1: "h2",
                // // Use a component instead of hrs
                // hr: ({ node, ...props }) => <MyFancyRule {...props} />,
              }
            }
          >
            {detail.content}
          </ReactMarkdown>
        </div>
      </article>
    </Loading>
  );
};
