import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

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

export default ({ link, icon, title }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-4 block"
    >
      <NavLink className="block" to={link}>
        {icon && <span className={`iconfont ${icon}`} />}
        {title}
      </NavLink>
    </motion.li>
  );
};
