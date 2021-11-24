import donateImg from "@/assets/imgs/donate.jpeg";

export default () => {
  return (
    <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
      <div className="w-full bg-white shadow flex flex-col my-4 md:my-0 p-6">
        <p className="text-xl font-semibold pb-5">关于我</p>
        <p className="pb-2 text-gray-600">
          资深前端开发工程师，坐标杭州，我会持续分享前端工作以及个人建站方面的技术，如果觉得我的文章对你有帮助，欢迎赞赏。
        </p>
        <img src={donateImg} className="mt-6" />
      </div>
    </aside>
  );
};
