import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default (props) => {
  const { detail } = props;
  const detailLink = `/post/${detail.id}`;

  return (
    <article className="flex flex-col shadow hover:shadow-lg dark:border dark:border-gray-800 my-4 w-full transition rounded overflow-hidden">
      <Link to={detailLink} className="hover:opacity-75 transition">
        <div
          className="h-0 bg-center bg-cover bg-no-repeat bg-gray-200"
          style={{
            paddingBottom: "61%",
            backgroundImage: `url(${
              detail.cover
                ? `/api${detail.cover.url}`
                : `https://picsum.photos/800/600?random=${detail.id}`
                // : `https://source.unsplash.com/collection/1346951/1000x500?sig=${detail.id}`
            })`,
          }}
        />
      </Link>
      <div className="bg-white dark:bg-black flex flex-col justify-start p-6">
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
          className="text-2xl font-bold hover:text-gray-700 dark:hover:text-gray-400 pb-4 transition"
        >
          {detail.title}
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-300 pb-3">
          By
          <a href="#" className="font-semibold hover:text-gray-800 dark:hover:text-gray-400 transition">
            羽衣尘
          </a>
          ， 更新于 {dayjs(detail.updated_at).format("YYYY-MM-DD HH:mm:ss")}
        </p>
        {detail.description && (
          <Link to={detailLink} className="pb-2">
            {detail.description}
          </Link>
        )}
      </div>
    </article>
  );
};
