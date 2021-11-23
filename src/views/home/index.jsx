import { useEffect, useState } from "react";
import Article from "@/components/article";
import Pagination from "@/components/pagination";
import Loading from "@/components/loading";
import axios from "axios";

export default () => {
  const [query, setQuery] = useState({
    _start: 0,
    _limit: 3,
    _sort: "published_at:DESC",
  });
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    setLoading(true);
    const [{ data: data1 }, { data: data2 }] = await Promise.all([
      axios.get("/api/posts", {
        params: query,
      }),
      axios.get("/api/posts/count", {
        params: query,
      }),
    ]);
    setLoading(false);
    setList(data1);
    setCount(data2);
  };

  useEffect(() => {
    getList();
  }, [query]);

  return (
    <Loading loading={loading} className="w-full">
      {list.map((x) => {
        return <Article key={x.id} detail={x} />;
      })}
      <Pagination
        start={query._start}
        total={count}
        pageSize={query._limit}
        onChange={(index) =>
          setQuery({ ...query, _start: query._limit * index })
        }
      />
    </Loading>
  );
};
