export default () => {
  return (
    <footer className="w-full border-t bg-white">
      <div className="w-full container mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row text-center md:text-left md:justify-between py-3">
          <a href="#" className="uppercase px-3">
            About Us
          </a>
          <a href="#" className="uppercase px-3">
            Privacy Policy
          </a>
          <a href="#" className="uppercase px-3">
            Terms & Conditions
          </a>
        </div>
        <div className="pb-2">浙ICP备2021034868号-1</div>
        <div className="pb-3">&copy; 2021 yuyichen.space</div>
      </div>
    </footer>
  );
};
