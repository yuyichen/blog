import { motion } from "framer-motion";
import MenuItem from "./item";

const variants = {
  open: {
    height: 'auto',
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
  },
  {
    link: "/news",
    title: "观点",
  },
];

export default () => (
  <motion.ul variants={variants} className="relative pt-4 overflow-hidden">
    {menus.map((x) => (
      <MenuItem key={x.link} {...x} />
    ))}
  </motion.ul>
);
