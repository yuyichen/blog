import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export default ({ link, icon, title, checkActive, toggle }) => {
  const { pathname } = useLocation();
  const isActive = checkActive(pathname, link);
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={classNames("p-4 block md:inline-block", {
        "font-bold": isActive,
      })}
      onClick={toggle}
    >
      <NavLink className="block" to={link}>
        {icon && <span className={`iconfont ${icon}`} />}
        {title}
      </NavLink>
    </motion.li>
  );
};
