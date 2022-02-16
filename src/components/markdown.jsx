import { useState, useEffect, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // github风格表格、链接、checklist
import CodeBox from "@/components/code-box";
import rehypeHighlight from "rehype-highlight"; // 代码高亮
import rehypeRaw from "rehype-raw"; // 支持markdown中的html代码
import "highlight.js/styles/atom-one-dark-reasonable.css";
import Viewer from "viewerjs"; // 图片预览
import "viewerjs/dist/viewer.min.css";
import classNames from "classnames";
import rehypeToc from "@jsdevtools/rehype-toc";

export default (props) => {
  const [gallery, setGallery] = useState();
  const containerRef = useRef();

  const generateHeadingMap = () => {
    // 为heading元素添加id，方便定位
    const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const map = {};
    headings.forEach((X) => {
      map[X] = (headProp) => {
        const position = headProp.node.position;
        const headingId = `id_${position.start.line}_${position.end.line}`;
        return <X id={headingId}>{headProp.children}</X>;
      };
    });
    return map;
  };

  const headingMap = useMemo(generateHeadingMap, []);

  useEffect(async () => {
    if (containerRef.current?.querySelectorAll("img")?.length > 0) {
      setGallery(new Viewer(containerRef.current));
      return () => {
        gallery?.destroy();
      };
    }
  }, [containerRef.current?.querySelectorAll("img")?.length]);

  useEffect(() => {
    // TOC位置显示在aside下方
    const asideFooterDom = document.querySelector("#asideFooter");
    const tocDom = document.querySelector("#write nav");
    if (asideFooterDom && tocDom) {
      asideFooterDom.appendChild(tocDom);
      asideFooterDom.classList.remove("hide");
      return () => {
        asideFooterDom.removeChild(tocDom);
        asideFooterDom.classList.add("hide");
      };
    }
  }, []);

  return (
    <div ref={containerRef}>
      <ReactMarkdown
        linkTarget="_blank"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeHighlight,
          rehypeRaw,
          [
            rehypeToc,
            {
              customizeTOCItem: (toc, heading) => {
                toc.properties.onClick = (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const position = heading.position;
                  const headingId = `id_${position.start.line}_${position.end.line}`;
                  if (headingId) {
                    document
                      .querySelector(`#${headingId}`)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                };
                return toc;
              },
            },
          ],
        ]}
        components={{
          ...headingMap,
          // // Use a component instead of hrs
          // hr: ({ node, ...props }) => <MyFancyRule {...props} />,
          img: ({ node, ...props }) => (
            <img
              {...props}
              className={classNames(props.className, "zoom-in")}
              onClick={() => {
                if (gallery) {
                  const index = gallery.images?.findIndex(
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
