import { useEffect, useState } from "react";
import axios from "axios";

export default (props) => {
  const {
    entityName = "posts",
    defaultQuery = {},
    isQueryOnMounted = true,
    callback = () => {
      window.scrollTo(0, 0);
    },
  } = props;

  const initialQuery = {
    _start: 0,
    _limit: 3,
    _sort: "published_at:DESC",
    ...defaultQuery,
  };

  const [query, setQuery] = useState(initialQuery);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    setLoading(true);
    const [{ data: data1 }, { data: data2 }] = await Promise.all([
      axios.get(`/api/${entityName}`, {
        params: query,
      }),
      axios.get(`/api/${entityName}/count`, {
        params: query,
      }),
    ]);
    setLoading(false);
    setList(data1);
    setCount(data2);
    if (typeof callback === "function") {
      callback();
    }
  };

  const resetList = () => {
    setQuery(initialQuery);
  };

  useEffect(() => {
    if (isQueryOnMounted) {
      getList();
    }
  }, [query]);

  return {
    query,
    setQuery,
    list,
    getList,
    count,
    loading,
  };
};
