"use client";

import Link from "next/link";

const surveysList = [
  {
    id: 1,
    title: "Plan PIIMEP",
    description:
      "Consulta para la mejora de espacios públicos de la comuna de El Quisco",
    endDate: "2021-01-02",
  },
  {
    id: 2,
    title: "Plan PIIMEP",
    description:
      "Consulta para la mejora de espacios públicos de la comuna de El Quisco",
    endDate: "2021-01-02",
  },
  {
    id: 3,
    title: "Plan PIIMEP",
    description:
      "Consulta para la mejora de espacios públicos de la comuna de El Quisco",
    endDate: "2021-01-02",
  },
];

export default function SurveysList() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Consultas en Curso
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {surveysList.map((survey, index) => (
          <Link
            // href={`/consultas/${survey.id}`}
            href={`/consultas/piimep`}
            key={survey.id + "-" + index}
            className="group flex transform transition-all duration-300"
          >
            <div className="flex grow gap-6">
              <div className="col-span-10 flex grow flex-col rounded-lg bg-white shadow-md hover:shadow-lg">
                <div className="flex h-full grow flex-col gap-1 p-6 pb-4">
                  <h3 className="text-xl font-bold text-[#3BA6DD] group-hover:text-[#002F4C]">
                    {survey.title}
                  </h3>
                  <p className="text-gray-600">{survey.description}</p>
                </div>
                <span className="relative right-0 bottom-0 flex w-full justify-between rounded-b-lg bg-slate-100 px-6 py-3 text-right text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:bg-[#2275C9] group-hover:text-slate-100">
                  <p className="text-sm">
                    <span className="font-medium">Termina:</span>{" "}
                    {new Date(survey.endDate).toLocaleDateString("es-CL")}
                  </p>
                  <p>Participar →</p>
                </span>
              </div>
              <div className="flex-cols relative col-span-2 flex items-center justify-center rounded-l-lg rounded-r-full bg-[#093F75] px-16 text-slate-100 shadow-md">
                {/* <p className="absolute top-0 left-0 w-full rounded-t-2xl bg-[#0c2647] py-2 text-center text-sm text-slate-200">
                  Cierre consulta
                </p> */}
                <span className="flex flex-col items-center gap-1 text-nowrap">
                  <p className="pt-6s text-3xl font-bold">{index * 10}</p>
                  <p className="text-sm text-slate-100">Mayo 2025</p>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
