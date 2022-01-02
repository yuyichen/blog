import { useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";
import useDimensions from "./useDimensions";
import MenuToggle from "./toggle";
import Navigation from "./list";
import classNames from "classnames";
import { useEffect } from "react/cjs/react.development";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    zIndex: 0,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    zIndex: -2,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [navCls, setNavCls] = useState();

  useEffect(() => {
    if (isOpen) {
      setNavCls("bottom-0 nav-width");
    } else {
      setTimeout(() => {
        setNavCls("");
      }, 2000);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="fixed z-1 inset-0" onClick={toggleOpen} />}
      <motion.nav
        className={classNames("fixed z-2 top-0 left-0 pb-4 pr-4", navCls)}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <motion.div
          className="absolute inset-0 bottom-0 bg-gray-300 bg-opacity-60 backdrop-filter backdrop-blur"
          variants={sidebar}
        />
        <MenuToggle toggle={toggleOpen} />
        <Navigation />
      </motion.nav>
    </>
  );
};
