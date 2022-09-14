import { useEffect, useState } from "react";
import PostList from "@/components/post-list";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Tag from "@/components/tag";
import { formatDate } from "@/utils";

export default () => {
  return (
    <PostList
      className="flex grid grid-cols-12 pb-10 sm:px-5 gap-x-8 gap-y-16"
      defaultQuery={{
        _limit: 6,
        // "_where[category.id]": 1,
      }}
      renderItem={(post, index) => {
        const detailLink = `/post/${post.id}`;
        return (
          <div
            className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4"
            key={post.id}
          >
            <div
              className="h-0 bg-center bg-cover bg-no-repeat bg-gray-200 w-full mb-2 overflow-hidden rounded-lg shadow-sm"
              style={{
                paddingBottom: "61%",
                backgroundImage: `url(${
                  post?.cover
                    ? `/api${post.cover?.url}`
                    : `https://picsum.photos/1000/600?random=${post.id}`
                    // : `https://source.unsplash.com/collection/1346951/1000x500?sig=${post.id}`
                })`,
              }}
            />
            <Tag type={post.link ? 2 : 1} />
            <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
              <Link to={detailLink} className="hover:opacity-75 transition">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500">{post.description}</p>
            <p className="pt-2 text-xs font-medium">
              <span className="mr-1 underline">羽衣尘</span>·
              <span className="mx-1">{formatDate(post.updated_at)}</span>
            </p>
          </div>
        );
      }}
    />
  );
};
