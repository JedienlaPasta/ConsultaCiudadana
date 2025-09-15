import { MetadataRoute } from "next";
import { getSurveysForSitemap } from "./lib/data/encuesta";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const surveys = await getSurveysForSitemap();
  return [
    {
      url: "https://participacion.munielquisco.gob.cl/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://participacion.munielquisco.gob.cl/consultas",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...surveys.map((survey) => ({
      url: `https://participacion.munielquisco.gob.cl/consultas/${survey.id}`,
      lastModified: survey.lastModified
        ? new Date(survey.lastModified)
        : new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  ];
}
