export default () => {
  return (
    <footer className="w-full border-t text-gray-600">
      <div className="w-full container mx-auto flex flex-col items-center">
        <div className="flex text-center justify-between py-3">
          <a
            href="https://github.com/yuyichen/"
            target="_blank"
            className="px-3 hover:text-blue-500 transition"
            title="github"
          >
            <span className="iconfont icon-github" />
          </a>
          <a
            href="https://huaban.com/jaawfnb7wg/"
            target="_blank"
            className="px-3 hover:text-blue-500 transition"
            title="花瓣"
          >
            <span className="iconfont icon-huaban" />
          </a>
        </div>
        <div className="pb-2">浙ICP备2021034868号-1</div>
        <div className="pb-3">&copy; 2021 yuyichen.space</div>
      </div>
    </footer>
  );
};
