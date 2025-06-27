import { getSession } from "./lib/actions/auth";
import Footer from "./ui/Footer";
import Hero from "./ui/home/Hero";
import SurveysList from "./ui/home/SurveysList";
import Navbar from "./ui/Navbar";

export default async function Home() {
  const session = await getSession();
  return (
    <>
      <Navbar isLoggedIn={session !== null} />
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
