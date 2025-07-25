import React from "react";
import { getSession } from "../lib/actions/auth";
import Navbar from "../ui/Navbar";
import SurveyFilter from "../ui/consultas/SurveyFilter";
import SurveysList from "../ui/SurveysList";
import Footer from "../ui/Footer";
import Header from "../ui/dashboard/Header";
import { getSurveysList } from "../lib/data/encuesta";

export default async function Dashboard() {
  const session = await getSession();
  const surveys = await getSurveysList();

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar isLoggedIn={session !== null} />
      <Header />
      <div className="container mx-auto max-w-[80rem] flex-1 px-8 py-12">
        <SurveyFilter />
        <SurveysList surveys={surveys} />
      </div>
      <Footer />
    </div>
  );
}
