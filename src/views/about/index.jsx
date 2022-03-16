import React from "react";
import donateImg from "@/assets/imgs/donate.jpeg";

const about = () => {
  return (
    <div className="w-full bg-white dark:bg-black shadow dark:border dark:border-gray-800 flex flex-col my-4 p-6 rounded">
      <p className="text-xl font-semibold pb-5">关于我</p>
      <p className="pb-2 text-gray-600 dark:text-gray-300">
        资深前端开发工程师，坐标杭州，我会持续分享前端工作以及个人建站方面的技术，如果觉得我的文章对你有帮助，欢迎赞赏。
      </p>
      <img src={donateImg} className="mt-6 mx-auto max-w-xs"/>
    </div>
  );
};

export default about;
