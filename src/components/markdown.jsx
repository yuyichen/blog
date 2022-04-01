import { useState, useEffect, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // github风格表格、链接、checklist
import CodeBox from "@/components/code-box";
import rehypeHighlight from "rehype-highlight"; // 代码高亮
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import less from "highlight.js/lib/languages/less";
import scss from "highlight.js/lib/languages/scss";
import nginx from "highlight.js/lib/languages/nginx";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import yaml from "highlight.js/lib/languages/yaml";
import rehypeRaw from "rehype-raw"; // 支持markdown中的html代码
import "highlight.js/styles/atom-one-dark-reasonable.css";
import Viewer from "viewerjs"; // 图片预览
import "viewerjs/dist/viewer.min.css";
import classNames from "classnames";
import rehypeToc from "@jsdevtools/rehype-toc";
import emojiMap from "@/components/wx-emoji";
import "@/components/wx-emoji/index.less";

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

  const filterText = (text) => {
    if (!text) return "";
    return text.replace(/\[(.*?)\]/g, (match, p1) => {
      if (p1 in emojiMap) {
        return `<span class="emoji ${emojiMap[p1]}"></span>`;
      }
      return text;
    });
  };

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
          [
            rehypeHighlight,
            {
              languages: {
                js,
                ts,
                css,
                less,
                scss,
                bash,
                json,
                nginx,
                sql,
                yaml,
              },
            },
          ],
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
            <span className="block my-4 text-center">
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
              {props.alt && (
                <span className="block mt-2 text-sm opacity-80">
                  {props.alt}
                </span>
              )}
            </span>
          ),
          code: ({ node, ...props }) => {
            const { inline, ...rest } = props;
            return inline ? (
              <code
                className="px-1 py-0.5 mx-1 rounded-sm"
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
          p: ({ node, ...props }) => {
            return (
              <p {...props}>
                {props.children.map((x, i) => {
                  if (typeof x === "string") {
                    return (
                      <span
                        key={i}
                        dangerouslySetInnerHTML={{ __html: filterText(x) }}
                      />
                    );
                  } else {
                    return x;
                  }
                })}
              </p>
            );
          },
        }}
      >
        {props.children}
      </ReactMarkdown>
    </div>
  );
};
