import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Aside from "@/components/aside";
import BgStars from "@/components/bg-stars";

export default (props) => {
  const { children } = props;
  return (
    <div>
      <BgStars/>
      <Menu />
      <Header />
      <div className="container mx-auto flex flex-wrap py-6">
        {
          <section className="w-full md:w-2/3 flex flex-col items-center px-3">
            {children}
          </section>
        }
        <Aside />
      </div>

      <Footer />
    </div>
  );
};
