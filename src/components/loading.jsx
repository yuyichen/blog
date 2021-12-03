import React from "react";
import loadingImg from "@/assets/imgs/thinking.gif";
import classnames from "classnames";

export default (props) => {
  const { children, loading = true, className, ...rest } = props;
  return (
    <div
      className={classnames("relative min-h-30 w-full", className)}
      {...rest}
    >
      {children}
      {loading && (
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-white z-20">
          <img
            src={loadingImg}
            style={{ width: 400 }}
            className="block mx-auto mt-20"
          />
        </div>
      )}
    </div>
  );
};
