import React from "react";
import loadingImg from "@/assets/imgs/thinking.gif";
import classnames from "classnames";
import { motion } from "framer-motion";

export default (props) => {
  const { children, loading = true, className, ...rest } = props;
  return (
    <div
      className={classnames("relative min-h-30 w-full", className)}
      {...rest}
    >
      {children}
      <motion.div
        className="fixed inset-0 bg-white z-20 flex items-center"
        style={{ pointerEvents: "none" }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
        initial="show"
        animate={loading ? "show" : "hidden"}
      >
        <img
          src={loadingImg}
          style={{ width: 400 }}
          className="block mx-auto mt-20"
        />
      </motion.div>
    </div>
  );
};
