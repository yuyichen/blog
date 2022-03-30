export default () => {
  return (
    <footer className="w-full border-t text-gray-600 dark:text-gray-300 dark:border-gray-800">
      <div className="w-full container mx-auto flex flex-col items-center">
        <div className="flex text-center justify-between py-3">
          <a
            href="https://github.com/yuyichen/"
            target="_blank"
            className="px-3 hover:text-gray-900 dark:hover:text-gray-400 transition"
            title="github"
          >
            <span className="iconfont icon-github" />
          </a>
          <a
            href="https://weibo.com/u/2617682101"
            target="_blank"
            className="px-3 hover:text-red-600 transition"
            title="weibo"
          >
            <span className="iconfont icon-weibo-fill" />
          </a>
          <a
            href="https://www.zhihu.com/people/li-li-28-1-49"
            target="_blank"
            className="px-3 hover:text-blue-600 transition"
            title="知乎"
          >
            <span className="iconfont icon-29" />
          </a>
          <a
            href="https://huaban.com/jaawfnb7wg/"
            target="_blank"
            className="px-3 hover:text-red-500 transition"
            title="花瓣"
          >
            <span className="iconfont icon-huaban" />
          </a>
          <span className="border-l dark:border-gray-400 mx-2"/>
          <a
            href="https://yuyichen.space/rss"
            target="_blank"
            className="px-3 transition"
            title="RSS订阅"
          >
            <span className="iconfont icon-RSS text-13px text-orange-500"/>
          </a>
        </div>
        <div className="pb-2">浙ICP备2021034868号-1</div>
        <div className="pb-3">&copy; 2021-2024 yuyichen.space</div>
      </div>
    </footer>
  );
};
