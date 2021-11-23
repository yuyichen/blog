import notFoundImg from "@/assets/imgs/404.png";

export default () => {
  return (
    <div className="h-full">
      <img src={notFoundImg} style={{ width: 400 }} className="mx-auto mt-30" />
      <div className="text-center">页面未找到</div>
    </div>
  );
};
