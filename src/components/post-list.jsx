import { useEffect, useState } from "react";
import Article from "@/components/article";
import Pagination from "@/components/pagination";
import Loading from "@/components/loading";
import useListService from "@/hooks/useListService";

export default (props) => {
  const {
    defaultQuery = {},
    renderItem = (post, index) => <Article key={post.id} detail={post} />,
    ...rest
  } = props;

  const { query, setQuery, list, getList, count, loading } = useListService({
    entityName: "posts",
    defaultQuery,
  });

  return (
    <Loading loading={loading}>
      <div {...rest}>
        {list.map(renderItem)}
      </div>
      {count > query._limit && (
        <Pagination
          start={query._start}
          total={count}
          pageSize={query._limit}
          onChange={(index) => {
            getList({ ...query, _start: query._limit * index });
          }}
        />
      )}
    </Loading>
  );
};
