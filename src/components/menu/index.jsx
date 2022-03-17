import { useRef, useState, useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import useDimensions from "./useDimensions";
import MenuToggle from "./toggle";
import Navigation from "./list";
import classNames from "classnames";
import ThemeSwitch from "../theme-switch";

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
    const isMinNav =
      window.getComputedStyle(containerRef?.current).display !== "none";
    if (!isMinNav) {
      return;
    }
    if (isOpen) {
      setNavCls("bottom-0 nav-width");
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      setTimeout(() => {
        setNavCls("");
      }, 600);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const darkModeEl = <ThemeSwitch className="mr-2" />;

  return (
    <>
      {isOpen && <div className="fixed z-1 inset-0" onClick={toggleOpen} />}
      <motion.nav
        className={classNames(
          "fixed flex flex-col z-2 top-0 left-0 pb-4 pr-4 md:hidden",
          navCls
        )}
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
        <Navigation toggle={toggleOpen} />
        {/* {isOpen && darkModeEl} */}
      </motion.nav>
      <motion.nav
        className={classNames(
          "hidden md:flex md:items-center fixed z-1 top-0 left-0 right-0 bg-gray-200 bg-opacity-60 shadow backdrop-filter backdrop-blur"
        )}
      >
        <Navigation toggle={toggleOpen} />
        {darkModeEl}
      </motion.nav>
    </>
  );
};
