import { useEffect, useState, useRef } from "react";
import useListService from "@/hooks/useListService";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

export default (props) => {
  const { className } = props;
  const inputRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { query, setQuery, list, getList, loading } = useListService({
    isQueryOnMounted: false,
  });

  const onChange = (e) => {
    const val = e.target.value?.trim();
    if (val) {
      setVisible(true);
      getList({
        ...query,
        "_where[title_contains]": val,
      });
    } else {
      setQuery({
        ...query,
        "_where[title_contains]": undefined,
      });
      setVisible(false);
    }
  };

  return (
    <div className={classNames("relative text-xs", className)}>
      <input
        ref={inputRef}
        className={classNames(
          "border-none focus:outline-none p-1.5 rounded text-gray-500 transition-all ease-in-out",
          isOpen ? "w-120px bg-white" : "w-0 bg-gray-200 px-0"
        )}
        placeholder="搜索关键字"
        onChange={debounce(onChange, 500)}
        onBlur={() => {
          if (isOpen) {
            setTimeout(() => {
              setIsOpen(false);
              setVisible(false);
            }, 500);
          }
        }}
      />
      {query["_where[title_contains]"] && visible && list?.length > 0 && (
        <div
          id="search-list"
          className={classNames(
            "absolute bg-white shadow w-200px max-h-200px rounded shadow h-0 overflow-hidden",
            {
              "h-auto": list?.length > 0,
            }
          )}
          style={{ top: "110%" }}
        >
          {list.map((x) => (
            <Link
              key={x.id}
              to={`/post/${x.id}`}
              className="block truncate text-xs p-2 text-gray-500 transition hover:text-gray-800 hover:bg-gray-100"
              title={x.title}
            >
              {x.title}
            </Link>
          ))}
        </div>
      )}
      <span
        className="iconfont icon-search p-2 cursor-pointer"
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
            setVisible(true);
            inputRef.current.focus();
          } else {
            setIsOpen(false);
            setVisible(false);
          }
        }}
      />
    </div>
  );
};
