import axios from "axios";
import { useState, useEffect } from "react";

export default () => {
  const [hitokotoData, setHitokotoData] = useState();

  const getHitokotoData = async () => {
    // 一言文档地址 https://developer.hitokoto.cn/sentence/#%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E
    const { data } = await axios.get("https://v1.hitokoto.cn?c=e&c=f&c=j&c=l");
    setHitokotoData(data);
  };

  useEffect(() => {
    getHitokotoData();
  }, []);

  return (
    <header className="w-full container mx-auto md:mt-56px">
      <div className="flex flex-col items-center py-12">
        <a
          className="font-bold text-gray-800 uppercase hover:text-gray-700 text-3xl"
          href="#"
        >
          羽衣尘的博客
        </a>
        <p className="text-lg text-gray-600 mt-4">一位野生前端开发工程师</p>
        {hitokotoData?.id && (
          <div className="text-sm italic mt-2 text-gray-500">
            {hitokotoData.hitokoto}
            <div className="text-right">—— {hitokotoData.from}</div>
          </div>
        )}
      </div>
    </header>
  );
};
