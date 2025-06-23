import Navbar from "./ui/Navbar";
import SurveysList from "./ui/home/SurveysList";
import Footer from "./ui/Footer";
import Hero from "./ui/home/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="">
          <Hero />
          <div className="container mx-auto max-w-[80rem] px-8 py-12">
            <SurveysList />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
