import { useState, useEffect } from "react";
import axios from "axios";

export default (props) => {
  const { href, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const [faviconLoaded, setFaviconLoaded] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    favicon: "",
    title: "",
    description: "",
    author: "",
  });

  const getPageInfo = async () => {
    setLoading(true);
    const { data } = await axios
      .get("/yuyichen-api/outerLink", {
        params: {
          url: encodeURIComponent(href),
        },
      })
      .finally(() => {
        setLoading(false);
      });
    if (data.title) {
      setPageInfo(data);
      loadingImg(data.favicon);
    }
  };

  const loadingImg = (imgUrl) => {
    if (!imgUrl) {
      return;
    }
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      setFaviconLoaded(true);
    };
  };

  useEffect(() => {
    getPageInfo();
  }, []);

  return loading ? (
    <a href={href} target="_blank">
      查看原文
    </a>
  ) : (
    <a
      href={href}
      target="_blank"
      style={{ color: "inherit" }}
      className="!hover:no-underline"
      {...rest}
    >
      <div className="flex p-3 rounded shadow hover:shadow-lg my-2 bg-gray-100 dark:bg-white dark:bg-opacity-20 dack:hover:bg-opacity-30 transition">
        <div
          style={{ width: 40, height: 40 }}
          className="flex items-center justify-center rounded bg-gray-200"
        >
          {faviconLoaded ? (
            <img src={pageInfo.favicon} style={{ width: 20, height: 20 }} />
          ) : (
            <span className="iconfont icon-link text-gray-400" />
          )}
        </div>
        <div className="ml-2 flex-1">
          <div className="text-md mb-1">{pageInfo.title || href}</div>
          <div className="text-xs text-gray-400">{pageInfo.description}</div>
        </div>
      </div>
    </a>
  );
};
