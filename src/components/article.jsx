import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { motion } from "framer-motion";

export default (props) => {
  const { detail } = props;
  const detailLink = `/post/${detail.id}`;

  const cardVariants = {
    offscreen: {
      y: 50,
      scale: 0.9,
    },
    onscreen: {
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.article
      className="flex flex-col shadow hover:shadow-lg my-4 w-full"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <Link to={detailLink} className="hover:opacity-75">
        <motion.div
          variants={cardVariants}
          className="h-0 bg-center bg-cover bg-no-repeat bg-gray-200"
          style={{
            paddingBottom: "61%",
            backgroundImage: `url(${
              detail.cover
                ? `/api${detail.cover.url}`
                : `https://source.unsplash.com/collection/1346951/1000x500?sig=${detail.id}`
            })`,
          }}
        ></motion.div>
      </Link>
      <div className="bg-white flex flex-col justify-start p-6">
        {Array.isArray(detail.tags) &&
          detail.tags.map((x) => (
            <a
              key={x}
              href="#"
              className="text-blue-700 text-sm font-bold uppercase pb-4 mr-4"
            >
              {x}
            </a>
          ))}

        <Link
          to={detailLink}
          className="text-2xl font-bold hover:text-gray-700 pb-4"
        >
          {detail.title}
        </Link>
        <p href="#" className="text-sm text-gray-600 pb-3">
          By
          <a href="#" className="font-semibold hover:text-gray-800">
            羽衣尘
          </a>
          , 发布于 {dayjs(detail.published_at).format("YYYY-MM-DD: HH:mm:ss")}
        </p>
        {detail.description && (
          <Link to={detailLink} className="pb-6">
            {detail.description}
          </Link>
        )}
        <Link
          to={detailLink}
          className="uppercase text-gray-800 hover:text-black"
        >
          阅读全文 <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </motion.article>
  );
};
