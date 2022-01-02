import { useEffect, useState } from "react";
import Article from "@/components/article";
import Pagination from "@/components/pagination";
import Loading from "@/components/loading";
import useListService from "@/hooks/useListService";

export default (props) => {
  const {
    defaultQuery = {},
    renderItem = (post, index) => <Article key={post.id} detail={post} />,
  } = props;

  const { query, setQuery, list, count, loading } = useListService({
    entityName: "posts",
    defaultQuery,
  });

  return (
    <Loading loading={loading} className="w-full">
      {list.map(renderItem)}
      {count > query._limit && (
        <Pagination
          start={query._start}
          total={count}
          pageSize={query._limit}
          onChange={(index) => {
            setQuery({ ...query, _start: query._limit * index });
          }}
        />
      )}
    </Loading>
  );
};
