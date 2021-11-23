import Nav from "@/components/nav";
import Header from "@/components/header";
import SubNav from "@/components/sub-nav";
import Footer from "@/components/footer";
import Aside from "@/components/aside";

export default (props) => {
  const { children } = props;
  return (
    <div>
      {/* <Nav /> */}
      <Header />
      <SubNav />
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
