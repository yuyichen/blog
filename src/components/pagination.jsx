import classNames from "classnames";

export default (props) => {
  const { start = 0, onChange, total, pageSize = 5 } = props;
  const current = start / pageSize;
  const totalPages = Math.ceil(total / pageSize);
  const arr = [current + 1];
  if (total > 0) {
    let i = 0;
    while (arr.length < 5 && i <= totalPages) {
      i++;
      const afterNum = current + 1 + i;
      const beforeNum = current + 1 - i;
      if (afterNum <= totalPages) {
        arr.push(afterNum);
      }
      if (beforeNum > 0) {
        arr.unshift(beforeNum);
      }
    }
  }

  const changePage = (index) => {
    if (index >= 0 && index < totalPages) {
      onChange(index);
    }
  };

  return (
    <div className="flex items-center py-8">
      {arr.map((x, i) => {
        return (
          <span
            key={`${x}_${i}`}
            onClick={() => changePage(x - 1)}
            className={classNames(
              "h-10 w-10 hover:bg-blue-600 hover:text-white font-semibold text-sm flex items-center justify-center cursor-pointer transition",
              current + 1 === x
                ? "bg-blue-800  text-white"
                : "text-gray-800 dark:text-gray-400"
            )}
          >
            {x}
          </span>
        );
      })}
      {current + 1 < totalPages && (
        <span
          onClick={() => changePage(current + 1)}
          className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 text-sm flex items-center justify-center ml-3 cursor-pointer transition"
        >
          Next <i className="fas fa-arrow-right ml-2"></i>
        </span>
      )}
    </div>
  );
};
