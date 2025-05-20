import Image from "next/image";
import Navbar from "./ui/Navbar";
import Hero from "./ui/home/Hero-home";
import SurveysList from "./ui/home/SurveysList-home";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="relatives flexs bg-slate-800s m-4s h-[calc(100vh-32px)]s">
          <Hero />
          <div className="container mx-auto max-w-[80rem] px-8 py-12">
            <SurveysList />
          </div>
        </div>
        <div className="relative h-[30vh] overflow-hidden">
          <Image
            src="/Blob17.svg"
            width={1920}
            height={1080}
            alt="Hero Banner"
            className="max-h-[170%]s absolute -top-[0%] left-0 w-full object-cover"
            priority
          />
        </div>
      </div>
    </>
  );
}
