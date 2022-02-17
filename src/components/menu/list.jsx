import { motion } from "framer-motion";
import MenuItem from "./item";

const variants = {
  open: {
    height: "auto",
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    height: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menus = [
  {
    link: "/",
    title: "技术",
    checkActive: (pathname, link) => {
      return pathname === "/" || pathname.startsWith("/post");
    },
  },
  {
    link: "/news",
    title: "观点",
    checkActive: (pathname, link) => {
      return pathname.startsWith("/news");
    },
  },
];

export default (props) => (
  <motion.ul
    variants={variants}
    className="flex-1 relative my-0 pt-4 overflow-hidden md:pt-0 md:container md:mx-auto"
  >
    {menus.map((x) => (
      <MenuItem key={x.link} {...x} toggle={props.toggle} />
    ))}
  </motion.ul>
);
