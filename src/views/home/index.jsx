import { useEffect, useState } from "react";
import PostList from "@/components/post-list";

export default () => {
  return (
    <PostList
      defaultQuery={{
        _limit: 3,
        "_where[category.id]": 1,
      }}
    />
  );
};
