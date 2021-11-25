import React from "react";
import loadingImg from "@/assets/imgs/thinking.gif";
import classnames from "classnames";

export default (props) => {
  const { children, loading = true, className, ...rest } = props;
  return (
    <div className={classnames("relative min-h-30", className)} {...rest}>
      {children}
      {loading && (
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-white bg-opacity-80 backdrop-blur-sm z-20 flex items-center justify-center">
          <img src={loadingImg} style={{ width: 400 }} />
        </div>
      )}
    </div>
  );
};
