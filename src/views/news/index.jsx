import { useEffect, useState } from "react";
import PostList from "@/components/post-list";
import Markdown from "@/components/markdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

dayjs.extend(relativeTime);

export default () => {
  const renderItem = (post, index) => {
    const updateMoment = dayjs(post.updated_at);
    const isUpdateRecent = dayjs() - updateMoment < 7 * 24 * 3600000;

    return (
      <div className="flex border-b" key={post.id}>
        <div className="pt-4 pr-4" style={{ width: 80 }}>
          <img src="https://cdn.yuyichen.space/avatar.jpg" alt="头像" />
        </div>
        <div className="flex-1 py-4 rounded mb-4">
          {post.description && (
            <div className="pb-4 mb-4 border-b">{post.description}</div>
          )}
          <div className="p-4 bg-gray-100 rounded-sm">
            <div>
              <span className="iconfont icon-link mr-2" />
              <a href={post.link} target="_blank">
                {post.title}
              </a>
            </div>
            {post.content && (
              <div className="border-t pt-4 mt-2">
                <Markdown>{post.content}</Markdown>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-4">
            {isUpdateRecent
              ? updateMoment.fromNow()
              : updateMoment.format("YYYY-MM-DD HH:mm:ss")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="write">
      <PostList
        defaultQuery={{
          _limit: 5,
          "_where[category.id]": 2,
        }}
        renderItem={renderItem}
      />
    </div>
  );
};
