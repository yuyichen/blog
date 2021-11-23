import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // github风格表格、链接、checklist
// import torchlight from "remark-torchlight"; // github风格表格、链接、checklist
import Loading from "@/components/loading";

export default () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/posts/${params.id}`);
    setDetail(data);
    setLoading(false);
  }, [params.id]);

  return (
    <Loading loading={loading}>
      <article className="flex flex-col shadow my-4">
        <a href="#" className="hover:opacity-75">
          <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=1" />
        </a>
        <div className="bg-white flex flex-col justify-start p-6">
          <a
            href="#"
            className="text-blue-700 text-sm font-bold uppercase pb-4"
          >
            Technology
          </a>
          <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">
            {detail.title}
          </a>
          <p href="#" className="text-sm pb-8">
            By
            <a href="#" className="font-semibold hover:text-gray-800">
              羽衣尘
            </a>
            , 发布于 {dayjs(detail.published_at).format("YYYY-MM-DD: HH:mm:ss")}
          </p>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={
              {
                // // Use h2s instead of h1s
                // h1: "h2",
                // // Use a component instead of hrs
                // hr: ({ node, ...props }) => <MyFancyRule {...props} />,
              }
            }
          >
            {detail.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* <div className="w-full flex pt-6">
        <a
          href="#"
          className="w-1/2 bg-white shadow hover:shadow-md text-left p-6"
        >
          <p className="text-lg text-blue-800 font-bold flex items-center">
            <i className="fas fa-arrow-left pr-1"></i> Previous
          </p>
          <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
        </a>
        <a
          href="#"
          className="w-1/2 bg-white shadow hover:shadow-md text-right p-6"
        >
          <p className="text-lg text-blue-800 font-bold flex items-center justify-end">
            Next <i className="fas fa-arrow-right pl-1"></i>
          </p>
          <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
        </a>
      </div> */}

      {/* <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
        <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
          <img
            src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
            className="rounded-full shadow h-32 w-32"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center md:justify-start">
          <p className="font-semibold text-2xl">David</p>
          <p className="pt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            vel neque non libero suscipit suscipit eu eu urna.
          </p>
          <div className="flex items-center justify-center md:justify-start text-2xl no-underline text-blue-800 pt-4">
            <a className="" href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a className="pl-4" href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="pl-4" href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="pl-4" href="#">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div> */}
    </Loading>
  );
};
