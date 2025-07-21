import Navbar from "@/app/ui/Navbar";
import SurveyHeader from "@/app/ui/consultas/SurveyHeader";
import React from "react";
import { getSession } from "@/app/lib/actions/auth";
import { getSurveyDetails } from "@/app/lib/data/encuesta";

type SurveyDetailsProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export default async function Layout(props: SurveyDetailsProps) {
  const session = await getSession();
  console.log("Session in layout:", session);

  const params = await props.params;
  const id = params.id;
  const survey = await getSurveyDetails(id);
  console.log("Survey in layout:", survey);

  return (
    <div>
      <Navbar isLoggedIn={session !== null} />
      <SurveyHeader survey={survey} />
      {props.children}
    </div>
  );
}
