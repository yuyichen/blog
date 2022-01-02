import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // github风格表格、链接、checklist
import CodeBox from "@/components/code-box";
import rehypeHighlight from "rehype-highlight"; // 代码高亮
import rehypeRaw from "rehype-raw"; // 支持markdown中的html代码
import "highlight.js/styles/atom-one-dark-reasonable.css";
import Viewer from "viewerjs"; // 图片预览
import "viewerjs/dist/viewer.min.css";
import classNames from "classnames";

export default (props) => {
  const [gallery, setGallery] = useState();
  const containerRef = useRef();

  useEffect(async () => {
    if (containerRef.current?.querySelectorAll("img")?.length > 0) {
      setGallery(new Viewer(containerRef.current));
      return () => {
        gallery?.destroy();
      };
    }
  }, [containerRef.current?.querySelectorAll("img")?.length]);

  return (
    <div ref={containerRef}>
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
              className={classNames(props.className, "zoom-in")}
              onClick={() => {
                if (gallery) {
                  const index = gallery?.images.findIndex(
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
        {props.children}
      </ReactMarkdown>
    </div>
  );
};
