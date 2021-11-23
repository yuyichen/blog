import notFoundImg from "@/assets/imgs/404.png";

export default () => {
  return (
    <div className="flex items-center justify-center h-full">
      <img src={notFoundImg} style={{ width: 400 }} />
      <div className="text-center">页面未找到</div>
    </div>
  );
};
